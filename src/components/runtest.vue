<template>
    <div>
        <my-toolbar></my-toolbar>
        <v-container>
            <v-layout row justify-center>
                <v-flex xs1>
                    <v-text-field box disabled :value="setworden()"></v-text-field>
                </v-flex>
                <v-flex xs2>
                    <v-text-field ></v-text-field>
                </v-flex>
                <v-flex xs2 v-if="show">
                    <v-text-field disabled solo :value="setword()"></v-text-field>
                </v-flex>
                    <v-btn @click="show=true">check</v-btn>
                    <v-btn @click="next">next</v-btn>
            </v-layout>
        </v-container>
        <!-- Liste mit allen Vokabeln -->
        
          

    </div>
</template>
<script>
import db from './firebaseinit'
export default {
   name:'runtest',
   data(){
       return{
           words:[],
           i:0,
           show:false,
           result:false,
           selected:[],
           headers:[{text:'Richtig?',sortable:false},{text:'Englisch',sortable:false},{text:'Deutsch',sortable:false}]

       }
   },
   created(){
       db.collection("words").get().then(querySnapshot =>{
           querySnapshot.forEach(doc=>{
               this.words.push(doc.data())
           })
       })
   },
   methods:{
       setworden(){
          
           return this.words[this.i].worden
       },
       setword(){
           
           
           return this.words[this.i].wordde

       },
       next(){
           var l = this.words.length
           if(this.i+1==l){
               this.result == true
           }else{
               	this.i ++
           }

            


       }
   } 
}
</script>
