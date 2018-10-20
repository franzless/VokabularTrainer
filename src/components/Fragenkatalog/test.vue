<template>
<div>
  <my-toolbar></my-toolbar>
    <v-layout justify-center>
      <v-flex xs12 sm9 md6>
      
              <v-card flat tile v-for="(frage,i) in fragen" :key="frage.fragenid">
                
                <v-card-title class="title">
                  Frage {{i+1}}
                </v-card-title>
                
                <v-card-text>
                  <v-text-field :value="frage.frage" disabled></v-text-field>
                </v-card-text>
   
    
                <v-card-actions>
                  
                  <v-radio-group v-model="frage.check">
                      <v-radio v-for="antwort in frage.antworten" :key="antwort.id" :label="antwort.text" :value="antwort.id"></v-radio>                   
                  </v-radio-group>
                  <v-radio-group v-show="done" v-model="frage.richtig[0].id">
                      <v-radio v-for="antwort in frage.antworten" :key="antwort.id"  :value="antwort.id" :color="frage.farbe"></v-radio>                   
                  </v-radio-group>                  
               </v-card-actions>    
              </v-card>
              <v-btn block color="secondary" @click="check">Check</v-btn>
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
           done:false
                     
        }},
        created(){
          this.getdata()
        },
        updated(){
          
        },
        computed:{
          katalogname (){
                    return this.$store.getters.katalogname
      }
        },
        methods:{
          check(){
            this.done=true
            console.log(this.fragen)

            this.fragen.forEach((f,i)=>{
              if(f.check === f.richtig[0].id){
                f.farbe = 'green'
              }else{
                f.farbe = 'red'
              }
            })

          },
          getdata(){
            var katalog = ''
            db.collection("kataloge").where("katalogname", "==",this.katalogname).get().then(query=>{
              query.forEach(doc=>{
                katalog = doc.id
                
              })
            }).then(()=>{
              db.collection("kataloge").doc(katalog).collection("fragen").get().then(query=>{
                query.forEach(doc=>{
                  this.fragen.push(doc.data())                  
                })
              }).then(()=>{
                this.fragen.map((f)=>f.farbe = 'blue')
              })
            })
          }
        }
        

       
    
}
</script>
