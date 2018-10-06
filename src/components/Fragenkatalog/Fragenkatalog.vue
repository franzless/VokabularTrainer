<template>
<div>
    <my-toolbar></my-toolbar>
    
   
    <v-layout justify-center fill-height row>
        <v-flex xs9 sm6 >
    <v-card color="orange" class="elevation-5">
        
        <v-card-title >
           
           
            <v-combobox v-model="katalog" :items="kataloge" label="Fragenkatalog"></v-combobox>
            <v-tooltip bottom>
            <v-btn fab slot="activator"><v-icon>build</v-icon></v-btn>
            <span>ausgewählten Fragenkatalog bearbeiten</span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn slot="activator" fab><v-icon>play_circle_filled</v-icon></v-btn>
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
        <v-card-actions>
            <v-divider></v-divider>
            <br>
        </v-card-actions>
        <v-card-actions>
             <v-expansion-panel popout >
        <v-expansion-panel-content v-for="frage in fragen" :key="frage.fragenid">
            <div slot="header">
                <v-layout row align-center>
                    <v-checkbox @click.native="addFrage(frage)" :label="frage.frage"></v-checkbox><v-btn flat ><v-icon>edit</v-icon></v-btn>
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
            fehler:''
            
        }
    },
    
    created(){
       
        db.collection("users").doc(this.user.email).collection("fragen").get().then(snap=>{
                snap.forEach(doc=>{                    
                    this.fragen.push({fragenid:doc.id,...doc.data()})
                })
            })
         db.collection("kataloge").get().then(snap=>{snap.forEach(doc=>{
            this.kataloge.push(doc.data().katalogname)
        })}) 
        
    },
    updated(){
    console.log(this.checked)    
        
    },
    computed:{
        user (){
            return this.$store.getters.login
        }
    },
    methods:{
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
            db.collection("kataloge").doc(r.id).collection("fragen").add(
                    frage)
            }
                                
            )})}

        },
        addFrage(a){
            var check = this.checked.findIndex(x=> x.fragenid === a.fragenid)
            
            if(check===-1){
                this.checked.push(a)
            }else{
                this.checked.splice(check,1)
            }
            
           } 
            
            
        }
    }

</script>
