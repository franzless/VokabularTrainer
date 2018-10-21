<template>
<div>
  <my-toolbar></my-toolbar>
    <v-layout justify-center>
      <v-flex xs12 sm9 md6>
      
              <v-card dark color="fprimary" flat tile v-for="(frage,i) in fragen" :key="frage.fragenid">
                
                <v-card-title class="title fsecondary">
                  Frage {{i+1}}
                </v-card-title>
                
                <v-card-text>
                  <v-text-field color="accent" :value="frage.frage" disabled></v-text-field>
                </v-card-text>
   
    
                <v-card-actions>
                  <v-layout row>
                    <v-flex xs1 v-if="done">
                    <v-radio-group  v-model="frage.richtig[0].id">
                      <v-radio v-for="antwort in frage.antworten" :key="antwort.id"  :value="antwort.id" :color="frage.farbe"></v-radio>                   
                  </v-radio-group>
                  </v-flex>
                  <v-flex xs11>
                    <v-radio-group v-model="frage.check">
                      <v-radio v-for="antwort in frage.antworten" :key="antwort.id" :label="antwort.text" :value="antwort.id"></v-radio>                   
                  </v-radio-group>
                  </v-flex>
                  </v-layout>                  
               </v-card-actions>    
              </v-card>
              <v-btn block color="accent" @click="check">Check</v-btn>
              </v-flex>  
  </v-layout> 

  <v-dialog v-model="dialog" max-width="350">
    <v-card >
      <v-toolbar color="fsecondary"><v-icon color="accent">info</v-icon><v-toolbar-title>Ergebniss</v-toolbar-title></v-toolbar>
      <v-card-title class="title">
        <v-layout column justify-center align-center>
        <v-flex xs9>
          Sie haben {{richtige}} von {{Anzahlf}} richtig erraten
          </v-flex>
          <v-flex xs12>
            <v-icon size="150">{{result.icon}}</v-icon>
            <v-text-field disabled v-model="result.text"></v-text-field>
          </v-flex>
          </v-layout>  
          
      </v-card-title>
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
           done:false,
           richtige:0,
           dialog:false
                     
        }},
        created(){
          this.getdata()
        },        
        computed:{
          katalogname (){
                    return this.$store.getters.katalogname
      },
        Anzahlf(){
          return this.fragen.length
        },
        result(){
          return {icon:(this.richtige/this.Anzahlf)*100 > 50 ? 'mood' : 'mood_bad',
                  text:(this.richtige/this.Anzahlf)*100 > 50 ? 'Nicht schlecht' : 'Könnte besser sein' 
        }        
        }},
        methods:{
          check(){
            this.done=true
            this.dialog="true"
            this.fragen.forEach((f,i)=>{
              if(f.check === f.richtig[0].id){
                this.richtige++
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
