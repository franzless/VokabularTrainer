<template>
<div>
    <my-toolbar></my-toolbar>
    <v-container fluid grid-list-xl>
        <v-layout justify-center align center>
            
                <v-card class="elevation-12" width="500">
        <v-flex sm6 offset-sm5>
            <v-chip v-for="(chip,index) in chips" :key="index" color="blue" text-color="white" close>{{chip}}</v-chip>
        </v-flex>
        <!-- Felder für Deutsch -->
            <v-layout justify-center >
              
            <v-flex sm8>
                <v-text-field box label="Füge ein neues Wort ein" v-model="wordDE">
                </v-text-field>
            </v-flex>
            <v-avatar size="50" ><img src="../assets/german.png" alt="">    
                </v-avatar>
            </v-layout>
        <!-- Felder für Deutsch Ende-->
        <!-- Felder für Englisch-->
        <v-layout row justify-center  >
          
            <v-flex sm8>
                <v-text-field box  v-model="wordEN" label="Enter new Word">

                </v-text-field>
            </v-flex>
            <v-avatar size="50"><img src="../assets/englisch.png" alt="">    
                </v-avatar>
            </v-layout>
        <!-- Felder für Englisch Ende-->
        
           
            <v-flex offset-sm5>
                <v-btn @click="addwords" color="plight">add to Dictionary</v-btn>
            </v-flex>
            </v-card>
            
        </v-layout>
    </v-container>

</div>

</template>
<script>
import db from './firebaseinit'
export default {
    name:'addWords',
    data(){
        return{
            words:[],
            chips:[],
            wordDE:'',
            wordEN:''

        }
    },
    created(){
        
    },
    
    methods:{
        addwords(){
           
            if(this.wordDE != '' && this.wordEN != ''){
                var newchip = this.wordDE+' | '+this.wordEN
                this.chips.push(newchip)
                db.collection("words").doc().set({
                    wordde:this.wordDE,
                    worden:this.wordEN,
                }) 
                    this.wordEN=''
                    this.wordDE=''
                }
            else{alert('Enter words first')}
            
                
        }
    }
    
}
</script>
