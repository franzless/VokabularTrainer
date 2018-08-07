<template>
    <div>
        <my-toolbar></my-toolbar>
        <!-- <v-container>
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
        </v-container> -->
        <v-layout align-content-center justify-center>

        
        <v-card width="600">
            <v-layout >
                <v-list subheader two-line>
                <v-subheader>{{i + ' of ' + x}}</v-subheader>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../assets/german.png" >
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-text-field disabled box :value="setword()"></v-text-field>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../assets/englisch.png" >
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-text-field box v-model="checkword"></v-text-field>
                        
                    </v-list-tile-content>
                    <v-list-tile-content v-if="show">
                        <v-text-field disabled box  value="test"></v-text-field>
                        
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-btn @click="next" color="info">next</v-btn>
                        
                 </v-list-tile>
            </v-list>
            </v-layout>
        </v-card>
        <v-card>
            <v-dialog v-model="dialog" width="500">
                <v-toolbar color="success"><v-toolbar-title>Result</v-toolbar-title></v-toolbar>
                <v-data-table
                    :headers="headers"
                    :items="result"
                    hide-actions
                    class="elevation-1"
                    
                    pagination.sync="pagination"
                    item-key="id"
                    loading="true"
                    
                >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.deutsch }}</td>
                    <td>{{ props.item.englisch }}</td>
                    <td>{{ props.item.trans }}</td>
                    <td>{{ props.item.value }}</td>
                 </template>
                    
                </v-data-table>

            </v-dialog>
        </v-card>
        </v-layout>
        
        

    </div>
</template>
<script>
import db from '../db/firebaseinit'
export default {
   name:'runtest',
   data(){
       return{
           words:[],
           i:0,
           x:null,
           checkword:'',
           show:false,
           result:[],
           dialog:false,
           headers:[{text:'word',value:'deutsch'},{text:'your translation',value:'englisch'} ,{text:'correct translation',value:'trans'},{text:'correct?',value:'value'} ]
           
           
       }
   },
   
   created(){
       db.collection("words").get().then(querySnapshot =>{
           querySnapshot.forEach(doc=>{
               this.words.push(doc.data())
           })
       }).then(()=>{
       var l= this.words.length
       this.x = l-1})
       
              
   },
   
   methods:{
       
       setworden(){
          
           return this.words[this.i].worden
       },
       setword(){
           
           
           return this.words[this.i].wordde

       },
       next(){
                      
           if(this.i==this.x){
               this.result.push({deutsch:this.setword(),englisch:this.checkword})
               this.dialog=true
               console.log(this.result)
               alert('finished', this.result)
           }else{
               this.result.push({deutsch:this.setword(),englisch:this.checkword})
               this.checkword='' 
               this.i ++
               
                   
           }

            


       }
   } 
}
</script>
