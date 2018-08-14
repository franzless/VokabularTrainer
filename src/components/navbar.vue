<template>
<div id="navbar">
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
        <v-btn flat v-if="isLoggedIn">
            <v-icon color="secondary" left>explore</v-icon> 
            Explore
        </v-btn>
        <v-btn flat v-if="isLoggedIn">
            <v-icon color="secondary" left>cached</v-icon> 
            Share
        </v-btn>
        
         <v-btn flat router to="/login" v-if="!isLoggedIn">
            <v-icon color="secondary" left>face</v-icon> 
            Login
        </v-btn>
        <v-btn flat v-if="isLoggedIn" @click="logout">
            <v-icon color="secondary" left>exit_to_app</v-icon> 
            Logout
        </v-btn>
        
    </v-toolbar-items>
</v-toolbar>

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
            this.currentUser = firebase.auth().currentUser.email
            this.$store.commit('login',this.currentUser)

        }
    },
    methods:{
        logout(){
        firebase.auth().signOut().then(()=>{
            this.$router.push('/login')
            this.$store.commit('logout')
        })
        },
        updateLoginUserState () {
        if (firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
            this.$store.commit('login',this.currentUser)
        } else {
           this.isLoggedIn = false
           this.currentUser = false
           this.$store.commit('logout')
        }
    }
    },
     watch: {
    '$route': 'updateLoginUserState'
  },
  
 


    
    
    
}
</script>
