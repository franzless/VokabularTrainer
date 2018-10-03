<template>
<div id="navbar">
    <v-card flat color="black" >
    <v-container fluid class="pa-0" >
      <v-layout row child-flex wrap>
        <div>
         <v-toolbar color="primary">
    <v-toolbar-title >
    <router-link to="/home" tag="span" style="cursor:pointer"><v-icon color="secondary" >language</v-icon>  Your Dictionary</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        
        <v-btn v-if="isLoggedIn" router flat to="/words">
            <v-icon color="secondary" left>list</v-icon>
            Add
        </v-btn>
        <v-btn v-if="isLoggedIn" flat router to="/newTest">
            <v-icon color="secondary" left>play_arrow</v-icon>
            Train
        </v-btn>
        <v-btn flat v-if="isLoggedIn" router to="/explore">
            <v-icon color="secondary" left>explore</v-icon> 
            Explore
        </v-btn>
        <v-btn flat v-if="isLoggedIn">
            <v-icon color="secondary" left>cached</v-icon> 
            Share
        </v-btn>
        
         <v-btn flat router to="/login" v-if="!isLoggedIn">
            <v-icon color="secondary" left>face</v-icon> 
            Login/Register
        </v-btn>
        
       
    </v-toolbar-items>
        </v-toolbar>
        </div>
        <div style="flex-basis: 8%">
            <v-toolbar>
        <v-btn flat v-if="isLoggedIn" router  to="/home">
            <v-icon left>home</v-icon> 
            Home
        </v-btn>
        <v-btn flat v-if="isLoggedIn" @click="logout">
            <v-icon  left>exit_to_app</v-icon> 
            Logout
        </v-btn>
        

        </v-toolbar>
        </div>    

        <div style="flex-basis: 30%">
          <v-toolbar dark>
              <v-toolbar-title><router-link to="/home" tag="span" style="cursor:pointer"><v-icon  >list</v-icon>  Mein Fragenkatalog</router-link></v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn flat v-if="isLoggedIn" router to="/neuefrage"><v-icon>add</v-icon>Neue Frage</v-btn>
            <v-btn flat  v-if="isLoggedIn" router to="/fragenkatalog"><v-icon>reorder</v-icon>Fragenkatalog</v-btn>
          </v-toolbar>
        </div>
      </v-layout>
    </v-container>
  </v-card>
<!-- <v-toolbar color="primary">
    <v-toolbar-title >
    <router-link to="/home" tag="span" style="cursor:pointer"><v-icon color="secondary" >language</v-icon>  Your Dictionary</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        
        <v-btn v-if="isLoggedIn" router flat to="/words">
            <v-icon color="secondary" left>list</v-icon>
            Add
        </v-btn>
        <v-btn v-if="isLoggedIn" flat router to="/newTest">
            <v-icon color="secondary" left>play_arrow</v-icon>
            Train
        </v-btn>
        <v-btn flat v-if="isLoggedIn" router to="/explore">
            <v-icon color="secondary" left>explore</v-icon> 
            Explore
        </v-btn>
        <v-btn flat v-if="isLoggedIn">
            <v-icon color="secondary" left>cached</v-icon> 
            Share
        </v-btn>
        
         <v-btn flat router to="/login" v-if="!isLoggedIn">
            <v-icon color="secondary" left>face</v-icon> 
            Login/Register
        </v-btn>
        <v-btn flat v-if="isLoggedIn" @click="logout">
            <v-icon color="secondary" left>exit_to_app</v-icon> 
            Logout
        </v-btn>
        
    </v-toolbar-items>
</v-toolbar> -->

</div>
    
</template>
<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            isLoggedIn:false,
            currentUser:''

    }},
    created(){
        if (firebase.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = firebase.auth().currentUser
            this.$store.commit('login',this.currentUser)

        }
    },
    methods:{
        logout(){
        firebase.auth().signOut().then(()=>{
            this.$router.go({path:this.$router.path})
            this.$store.commit('logout')
        })
        },
        
  
 


    
    
    
}}
</script>
