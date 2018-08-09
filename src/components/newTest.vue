<template>
    <div>
        <my-toolbar></my-toolbar>
        
        <!-- Liste mit allen Vokabeln -->
        <v-layout justify-center align-center>
        <v-flex sm4>
       
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
                     <v-select label="Choose your customized test" v-model="blubb"></v-select>
                    </v-flex>
                 </v-list-tile>
                 <v-divider></v-divider>
                 <v-list-tile>
                     <v-btn @click="start" color="pdark" dark>Start Test</v-btn>   
                 </v-list-tile>
                 
                 <v-list-tile-action>
                     <v-alert transition="scale-transition" type="error" v-model="alert">
                     Please choose Language and amount of words first    
                     </v-alert>
                 </v-list-tile-action>
                 
                 
                     
                    

            </v-list>
        </v-card>
        </v-flex>
        </v-layout>    
        
          

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
           blubb:'',
           alert:false
       }
   },
   
   
   methods:{
       start(){
           if(!this.plang && !this.numberofwords){
               this.alert=true
           }
       
       

            


       }
   } 
}
</script>
