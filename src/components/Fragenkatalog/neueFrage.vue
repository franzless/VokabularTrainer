<template>
<div>
  <my-toolbar></my-toolbar>
<v-container style="max-width: 800px">
    <v-text-field v-model="frage" label="Neue Frage" solo ></v-text-field>
    <v-text-field v-if="(completed > 0 || frage.length>10)" v-model="antwort" label="Erstelle eine Antwort" solo @keydown.enter="addAntwort">
         <v-fade-transition slot="append">
            <v-icon v-if="antwort" @click="addAntwort"> add_circle</v-icon>
      </v-fade-transition>
    </v-text-field>
    <h2 class="display-1  pl-3">
      Frage erstellt ?
      <v-fade-transition leave-absolute>
        <v-icon v-if="frage.length < 11" size="40" color="error">close</v-icon>
        <v-icon v-else size="40" color="success">check</v-icon>
      </v-fade-transition>
    </h2>
     <h2 class="display-1  pl-3" v-if="frage.length>10">
      Antworten:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`antworten-${antworten.length}`">
          {{ antworten.length }}
        </span>
      </v-fade-transition>
    </h2>
    <h2 class="display-1  pl-3" v-if="completed>4">
      richtige Antwort markiert
      <v-fade-transition leave-absolute>
        <v-icon v-if="completed == 5 " size="40" color="error">close</v-icon>
        <v-icon v-else size="40" color="success">check</v-icon>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-3"></v-divider>

    <v-layout
      my-1
      align-center
    >
      <strong class="mx-3 info--text text--darken-3">
        Remaining: {{ remaining }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-3 black--text">
        Completed: {{ completed }}
      </strong>
      <v-spacer></v-spacer>
      <v-progress-circular
        :value="progress"
        color="primary"
        class="mr-2"
      ></v-progress-circular>
        </v-layout>
        <v-divider></v-divider>
        <v-card v-if="completed > 0" width="100%">
         
           <v-list >                                
                    <v-list-tile v-for="antwort in antworten" :key="antwort.id">
                            <v-list-tile>
                              <v-checkbox v-if="remaining < 2" v-model="antwort.zustand" @click.native ="check(antwort.zustand)" ></v-checkbox>
                            </v-list-tile>
                            
                            <v-text-field class="test"  v-model="antwort.text" @click:prepend="lockTrue(antwort.text)"></v-text-field>
                            
                      
                    </v-list-tile>
        
       </v-list>  
           
        </v-card>
        <br>
        <v-btn color="success" v-if="completed>5" @click="finish">Erstellen</v-btn>
    </v-container> 

    <v-dialog v-model="dialog" width="300" >
      <v-card>
        <v-card-title class="headline grey lighten-2"
          primary-title>
          <v-alert :value="true" type="success">Erfolgreich erstellt !!</v-alert>
        </v-card-title>
      </v-card>
      </v-dialog>   

</div>   
</template>
<script>
import db from '../../db/firebaseinit'
export default {
  data() {
    return {
      antworten: [],
      antwort: "",
      frage: "",
      dialog: false,
      counter:null
      
    }
  },
  updated(){
    
  },
  watch:{
    frage(val){
      if(val.length>10 && val.length<12){
        this.counter++
      }
    }
  }
  
 ,
  computed: {
    user (){
      return this.$store.getters.login
    },
    remaining() {
      return 6 - this.counter;
    },
    completed() {
      return this.counter;
    },
    progress() {
      return (this.completed / 6) * 100;
    }
  },
  methods: {
    addAntwort() {
      var id = this.antworten.length + 1;
      this.counter ++
      this.antworten.push({
        id: id,
        text: this.antwort
      });
      this.antwort = "";
    },
    check(value){
      if(value===true){
        this.counter++
      }else{
        this.counter--
      }
    },
        
    finish() {

    var array = this.antworten.map((a)=>{return{
      id:a.id,text:a.text
    }})
    var richtig = this.antworten.filter(a=>a.zustand===true).map((a)=>{return{
      id:a.id,text:a.text
    }})     

        db.collection("users").doc(this.user.email).collection("fragen").add({
        frage:this.frage,
        antworten:array,
        richtig:richtig
      })
      .then(()=>{
        this.antworten = []
        this.frage= ''
        this.antwort=''
        this.counter = null
        this.dialog=true
      })  
      }
    ,
    
  }
};
</script>
<style scoped>

</style>
