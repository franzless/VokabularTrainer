<template>
<div>
    <my-toolbar></my-toolbar>
    
   
    <v-layout justify-center fill-height row>
        <v-flex xs9 sm6 >
    <v-card color="orange" class="elevation-5">
        
        <v-card-title >
           
           
            <v-combobox v-model="katalog" :items="kataloge" label="Fragenkatalog"></v-combobox>
            <v-tooltip bottom>
            <v-btn @click="Katalogbearbeiten" fab slot="activator"><v-icon>build</v-icon></v-btn>
            <span>ausgewählten Fragenkatalog bearbeiten</span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn @click="startTest" slot="activator" fab><v-icon>play_circle_filled</v-icon></v-btn>
                <span>ausgewählten Fragenkatalog starten</span>
            </v-tooltip>
            <v-tooltip bottom>
                <span>Neuen Fragenkatalog erstellen, dazu bitte die Fragen abhaken und den Namen bestimmen</span>
                <v-btn @click="neuerKatalog" fab slot="activator" ><v-icon>add</v-icon></v-btn>
            </v-tooltip>
            
            
            
        </v-card-title>
        <v-card-title>
            <v-alert dismissible v-model="alert" type="error" transition="scale-transition">{{fehler}}</v-alert>
        </v-card-title>
        <v-card-title v-if="save">
            <v-alert dismissible value="true" type="success">Katalog erfolgreich geladen</v-alert>
            <v-btn @click="saveChanges">Änderungen speichern</v-btn>
        </v-card-title>
        <v-card-actions>
            <v-divider></v-divider>
            <br>
        </v-card-actions>
        <v-card-actions>
             <v-expansion-panel popout >
        <v-expansion-panel-content v-for="frage in fragen" :key="frage.fragenid">
            <div slot="header">
                <v-layout row align-center>
                    <v-checkbox @click.native="addFrage(frage)" :label="frage.frage" v-model="frage.checked"></v-checkbox><v-btn @click="editFrage(frage)" flat ><v-icon>edit</v-icon></v-btn>
                </v-layout>
                
                
            </div>
            <v-list>
                <v-list-tile v-for="antworten in frage.antworten" :key="antworten.id">
                    <v-list-tile-content>
                       {{antworten.id}}:{{antworten.text}}
                    </v-list-tile-content>
                </v-list-tile>
                
            </v-list>
        </v-expansion-panel-content>
        </v-expansion-panel>
        </v-card-actions>
    </v-card>   
    <br>   
    </v-flex>        
    </v-layout> 
    <!-- dialog -->
    
        <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
             <v-toolbar card color="primary"><v-icon color="secondary">edit</v-icon><v-toolbar-title>Frage bearbeiten</v-toolbar-title></v-toolbar>
            <v-container grid-list-xl>
                <v-layout >
                    <v-flex xs9>                       
                    <v-text-field v-model="edit.frage" label="Frage"></v-text-field>
                    <v-text-field v-for="e in edit.antworten" :key="e.fragenid" v-model="e.text" :label="'Antwort ' + e.id"></v-text-field>
                    <v-btn color="primary" @click="updateFrage">fertig</v-btn>
                    <v-btn @click="dialog=false" color="error">abbrechen</v-btn>                    
                    
                    </v-flex>
                </v-layout>
                
            </v-container>
        </v-card>
     
    </v-dialog>
    

</div>
    
</template>
<script>
import db from '../../db/firebaseinit'
export default {
    
    data(){
        return{
            fragen:[],
            checked:[],
            katalog:'',
            kataloge:[],
            alert:false,
            fehler:'',
            bearbeiten:[],
            save:false,
            katalogid:'',
            dialog:false,
            edit:{}
            
        }
    },
    
    created(){
        this.getfragen()
        
        
    },
    updated(){
       
        
    },
    computed:{
        user (){
            return this.$store.getters.login
        }
    },
    methods:{
        editFrage(f){
            
            this.edit = f
            this.dialog=true
        },
        updateFrage(){
            var docs = []
            var fragen = []
           

           db.collection("users").doc(this.user.email).collection("fragen").doc(this.edit.fragenid).
           update(this.edit)

            db.collection("kataloge").where("email","==",this.user.email).get().then(query=>{
                query.forEach(doc=>{                    
                    docs.push(doc.id)
                })
            }).then(()=>{
                docs.forEach(doc=>{
                db.collection("kataloge").doc(doc).collection("fragen").where("fragenid","==",this.edit.fragenid).get().then(query=>{query.forEach(q=>{                    
                    fragen.push(q.id)
                })}).then(()=>{                    
                    fragen.forEach(f=>{
                        db.collection("kataloge").doc(doc).collection("fragen").doc(f).update(this.edit)
                    })
                })
            })
            }) 
           this.dialog=false 
        },
        neuerKatalog(){
            
        var checkName = this.kataloge.filter(k=>k===this.katalog)    
        
        if(!this.katalog){
            this.alert= true
            this.fehler = 'Bitte erst neuen Katalognamen eintragen'

        }
        else if(checkName.length>0){
            this.alert=true
            this.fehler = 'Dieser Katalogname exisiert bereits, bitte anderen wählen'
        }
        else if(this.checked.length < 1){
                this.alert=true
                this.fehler = 'Bitte wählen Sie mindestens eine Frage aus, welche zum neuen Katalog hinzugefügt werden soll'
        }     
        
        else{
                       
            db.collection("kataloge").add({
                uid:this.user.uid,
                email:this.user.email,
                username:this.user.displayName,
                katalogname:this.katalog                             
            }).then(r=>{               
                
            this.checked.forEach(frage=>{
                db.collection("kataloge").doc(r.id).collection("fragen").add({
                    fragenid:frage.fragenid,
                    frage:frage.frage,
                    antworten:frage.antworten,
                    richtig:frage.richtig
                })
                })
                })
            }

        },
        addFrage(a){
            var check = this.checked.findIndex(x=> x.fragenid === a.fragenid)
            
            if(check===-1){
                this.checked.push(a)
            }else{
                this.checked.splice(check,1)
            }            
           },
        Katalogbearbeiten(){
            this.bearbeiten = []
            this.checked = []
            this.getfragen()            
            if(!this.katalog){
                this.fehler='Bitte wählen Sie erst den bereits erstellten Katalog aus, welchen Sie bearbeiten möchten'
                this.alert=true
            }else{
                db.collection("kataloge").where("katalogname","==",this.katalog).get().then(query=>{
                    query.forEach(doc=>{
                        this.katalogid= doc.id
                    })
                }).then(()=>{
                db.collection("kataloge").doc(this.katalogid).collection("fragen").get().then(snap=>{
                    snap.forEach(doc=>{
                        this.bearbeiten.push({fragenid:doc.data().fragenid,docid:doc.id})
                        this.checked.push(doc.data())
                    })
                }).then(()=>{
                    this.save = true

                       for(var x=0;x<this.fragen.length;x++){ 
                            for(var i=0;i<this.bearbeiten.length;i++){                       
                                if(this.fragen[x].fragenid===this.bearbeiten[i].fragenid){
                                    this.fragen[x].checked = true                                    
                                }
                       }} 
                   
                    
                    })
                })
            }
        },
        saveChanges(){
            //braucht noch Überarbeitung, funktioniert zwar, aber ungut
            this.save=false

                this.bearbeiten.forEach(frage=>{
                db.collection("kataloge").doc(this.katalogid).collection("fragen").doc(frage.docid).delete(
                )})

                    this.checked.forEach(frage=>{
                        db.collection("kataloge").doc(this.katalogid).collection("fragen").add({
                            fragenid:frage.fragenid,
                            frage:frage.frage,
                            antworten:frage.antworten,
                            richtig:frage.richtig
                })
                })
        },
        startTest(){
            if(this.katalog){
                this.$store.commit('katalogname', this.katalog)
                this.$router.push('/KatalogTest')
            }else{
                this.fehler='Bitte wählen Sie erst den Katalog aus, welchen Sie starten möchten'
                this.alert=true  
            }
            
        },



        getfragen(){
            this.fragen = []
            this.kataloge = []
        db.collection("users").doc(this.user.email).collection("fragen").get().then(snap=>{
                snap.forEach(doc=>{                    
                    this.fragen.push({fragenid:doc.id,...doc.data()})
                })
            })
         db.collection("kataloge").get().then(snap=>{snap.forEach(doc=>{
            this.kataloge.push(doc.data().katalogname)
        })}) 
        }
            
            
        }
    }

</script>
