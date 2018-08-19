<template>
    <div>
        <my-toolbar></my-toolbar>
        
        <!-- Liste mit allen Vokabeln -->
        <v-content>
        <v-container fill-height >
        <v-layout justify-center >
        <v-flex sm4 >
       
        <v-card>
            <v-toolbar color="primary"><v-toolbar-title>Configure Test</v-toolbar-title></v-toolbar>
            <v-list two-line subheader >
                <v-tooltip color="red lighten-3" top>
             <v-subheader slot="activator">Choose Language</v-subheader>
             <span>Choose which language should be querried in Test</span>
             </v-tooltip>
             <v-list-tile>
                 <v-radio-group v-model="plang">
                     <v-radio color="yellow darken-3" value="german" label="German"></v-radio>
                     <v-radio color="red" value="english" label="English"></v-radio>
                    
                 </v-radio-group>
                 </v-list-tile>
                 <v-divider></v-divider>
                 <v-subheader>Which words should the Test contain?</v-subheader>
                 <v-list-tile>
                     <v-radio-group v-model="radio" :mandatory="false">
                     <v-radio color="yellow darken-3" value="custom" label="custom"></v-radio>
                     <v-radio color="red" value="random" label="random"></v-radio>
                                       
                 </v-radio-group>
                 
                 </v-list-tile>
                 
                 <v-list-tile v-if="radio=='random'">
                    <v-flex xs6>
                     <v-combobox v-model="numberofwords"
                                :items="items"
                                label="Choose/Enter number"></v-combobox>
                    </v-flex>
                 </v-list-tile>
                 <v-list-tile v-if="radio=='custom'">
                    <v-flex xs9>
                     <v-select label="Choose your customized test" :items="lists" v-model="list"></v-select>
                    </v-flex>
                 </v-list-tile>
                 <v-divider></v-divider>
                 <v-list-tile>
                     <v-btn :disabled="loading" :loading="loading" @click="start" color="pdark" dark>Start Test</v-btn>   
                 </v-list-tile>
                 
                 <v-list-tile-action>
                     <v-alert transition="scale-transition" type="error" v-model="alert">
                     Please choose Language and List first   
                     </v-alert>
                 </v-list-tile-action>
                 
                 
                     
                    

            </v-list>
        </v-card>
        </v-flex>
        </v-layout>    
        </v-container>
        <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="secondary"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
          </v-content>

    </div>
</template>
<script>
import db from '../db/firebaseinit'
export default {
   name:'runtest',
   data(){
       return{
           
           radio:'',
           plang:'',
           items:[10,15,20,25,30],
           numberofwords:null,
           count:0,
           alert:false,
           lists:[],
           list:'',
           words:[],
           loading:false
       }
   },
   created(){
       this.getlists()
       this.yourWords()
   },
   computed:{
       user(){
           return this.$store.getters.login
       },
       
   },
   
   
   methods:{
       
       start(){
           
           this.words= []
           var data = []
           if(!this.list && !this.numberofwords){
               this.alert=true
           }else{
               if(this.radio == 'custom'){
                   db.collection("lists").where("Lname","==",this.list).get().then(query=>{
                       query.forEach(doc=>{
                           
                           data.push({docid:doc.id,
                           ...doc.data()})
                       })                          
                           
                       
                    }).then(()=>{
                       
                    db.collection("lists").doc(data[0].docid).collection("words").get().then(query=>{
                        query.forEach(word=>{
                           this.words.push(word.data())
                        })
                    })
                    }).then(()=>{
                        this.loading = true
                        setTimeout(()=>{
                        this.$store.dispatch('addWords',this.words)
                        this.$store.dispatch('listinfo',data)
                        this.$router.push('/test')
                        this.loading=false
                        },4000)
                        
                        
                        
                    })
                  
               }else if(this.radio == 'random'){
                                       
                   
                   if(!this.numberofwords || this.numberofwords > this.count){
                       alert('Not enough words in your Collection')
                   }else{
                   db.collection("users").doc(this.user.email).collection("words").get().then(query=>{
                       query.forEach(word=>{
                           this.words.push(word.data()) 
                       })
                   }).then(()=>{
                        var kill = this.words.length - this.numberofwords
                        for(var i=0;i<kill;i++){
                                var random = Math.floor((Math.random() * this.words.length) + 0)
                                this.words.splice(random,1)    
                        }
                    }).then(()=>{
                        this.$store.commit('addWords',this.words)
                        this.$router.push('/test')
                    })
                        }}
                    }
        },
       getlists(){
           var ref = db.collection("lists").where("uid.uid", "==", this.user.uid).get().then(querySnapshot =>{
               querySnapshot.forEach(doc=>{
               this.lists.push(doc.data().Lname)    
               })
           })
           
       },
       yourWords(){
           this.count = 0
           var count = 0
           db.collection("users").doc(this.user.email).collection("words").get().then(query=>{
               query.forEach(doc=>{
                   count ++
               })
           }).then(()=>{
            
             this.count = count                  
           })
       }
       

   } 
}
</script>
