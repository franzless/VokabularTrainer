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
        <v-container fill-height>
        <v-layout align-center justify-center>

        
        <v-card width="400" class="elevation-12">
            <v-layout >
                <v-list subheader two-line>
                <v-subheader>{{i+1}}  of {{x+1}}</v-subheader>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../../assets/german.png" >
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-text-field disabled box :value="setword()"></v-text-field>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../../assets/englisch.png" >
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
            <v-dialog v-model="dialog" width="500" persistent>
                <v-toolbar color="success"><v-toolbar-title>Result</v-toolbar-title></v-toolbar>
                <v-data-table
                    :headers="headers"
                    :items="mappedresult"
                    hide-actions
                    class="elevation-1"
                    
                    pagination.sync="pagination"
                    item-key="word"
                    
                >
                <template slot="items" slot-scope="props">
                    <tr :style="{backgroundColor: (props.item.value == true ? '#A5D6A7' : '#EF9A9A' ) }">
                    <td >{{ props.item.word }}</td>
                    <td>{{ props.item.entry }}</td>
                    <td>{{ props.item.check }}</td>
                    <td>
        <v-checkbox
          v-model="props.item.value"
          primary
          hide-details
          disabled
        ></v-checkbox>
      </td></tr>
                   </template>
                 <template slot="footer">
                    <td colspan="100%">
                    <strong>You've got {{counter}} of {{x+1}} </strong>
                    <v-spacer></v-spacer>
                    <v-btn router to="/newtest" color="success">
                        <v-icon>weekend</v-icon>
                    </v-btn>
                    </td>
                 </template>
                  
                </v-data-table>

            </v-dialog>
        </v-card>
        </v-layout>
        </v-container>
        

    </div>
</template>
<script>
import db from '../../db/firebaseinit'
import firebase from 'firebase'
export default {
   name:'runtest',
   data(){
       return{
           test:[],
           i:0,
           x:null,
           checkword:'',
           show:false,
           result:[],
           mappedresult:[],
           dialog:false,
           headers:[{text:'word',value:'deutsch'},{text:'your translation',value:'englisch'} ,{text:'correct translation',value:'trans'},{value:'value'} ],
           counter:[]
           
           
       }
   },
      
   created(){
       setTimeout(()=>{
              
              this.x = this.words.length -1
              console.log(this.words)
             
       },1000)
        
              
   },
   computed:{
       words(){
           return this.$store.getters.getwords  
       },
       info(){
           return this.$store.getters.getlistinfo
       },
       user(){
           return this.$store.getters.login
       }
   },
   
   methods:{
       async clicks(){
           
           await db.collection("lists").doc(this.info[0].docid).update({
               clicks:this.info[0].clicks+1
           })
       },
       count(){
         this.counter= this.mappedresult.reduce((sum, order)=>{
             if(order.value === true){
                 
                 return sum+1
             }else{return sum}
         }, 0)
           
       },
       
       setworden(){
          
           return this.words[this.i].worden
       },
       setword(){
           
            return this.words[this.i].wordde
       
       },
       next(){
                      
           if(this.i==this.x){
               this.result.push({deutsch:this.setword(),englisch:this.checkword})
               this.newarray()
               if(this.info.Lname != 'daily'){
                   this.clicks()
               }
               this.count()
               
               this.dialog=true
               
               
               
           }else{
               this.result.push({deutsch:this.setword(),englisch:this.checkword})
               this.checkword='' 
               this.i ++
               
                   
           }
       },
       newarray(){
           
       this.mappedresult= this.result.map((val,index,arr)=>{
           return{
                word:val.deutsch,
                entry:val.englisch,
                check:this.words[index].worden,
                
                }
       }).map((val,index,arr)=>{
           if (val.entry === val.check){
             
               return{
                   wordid:this.words[index].wordid,
                   word:val.word,
                   entry:val.entry,
                   check:val.check,
                   value:true
               }
           }else{
                
               return{
                   wordid:this.words[index].wordid,
                   word:val.word,
                   entry:val.entry,
                   check:val.check,
                   value:false 
               }
           }
       })
       if(this.info.Lname == 'daily'){
       this.updatestatisticsDaily()
       }else if(this.info.Lname == 'weekly'){
           this.updatestatisticsWeekly()
       }
       else{
           this.updatestatistics()
       }
          
       },
        async updatestatistics(){
            await this.mappedresult.forEach(word=>{
                db.collection("users").doc(this.user.email).collection("words")
                .doc(word.wordid).update({    
                    statistics:firebase.firestore.FieldValue.arrayUnion({correct:word.value, time: new Date (Date.now())})
   
                })
            })
        },
        async updatestatisticsDaily(){
            await this.mappedresult.forEach(word=>{
                db.collection("tests").doc(this.user.email).collection("daily")
                .doc(word.wordid).update({    
                    statistics:firebase.firestore.FieldValue.arrayUnion({correct:word.value, time: new Date (Date.now())})
   
                }).then(()=>{
                    this.updatestatistics()
                })
            })
        },
        async updatestatisticsWeekly(){
            await this.mappedresult.forEach(word=>{
                db.collection("tests").doc(this.user.email).collection("weekly")
                .doc(word.wordid).update({    
                    statistics:firebase.firestore.FieldValue.arrayUnion({correct:word.value, time: new Date (Date.now())})
   
                }).then(()=>{
                    this.updatestatistics()
                })
            })
        }
   } 
}
</script>
