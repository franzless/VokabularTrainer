<template>
  
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer> 
              </v-toolbar>
              <v-card-text>
                
                  <v-text-field v-model="user.email" prepend-icon="person" name="login" label="E-Mail required " type="text"></v-text-field>
                  
                  <v-text-field v-model="user.password"  prepend-icon="lock"  label="Password" type="password"></v-text-field>
                  <v-alert type="error" v-model="loginerror.state">
                  {{loginerror.message}}  
                  </v-alert>
                
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="green accent-4">Login</v-btn>
                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    
    
    
    
    
  </v-content>
</template>

<script>
import firebase from 'firebase'
import db from '../db/firebaseinit'


export default {
  data () {
    return {
      dialog:false,
      
      valid:true,
      loginerror:{
        state:false,
        message:''
      },
      
      user: {
        email: '',
        password: ''
      },
      error:{
        state:false,
        message:''
      },
       
    }
  },
  methods:{
    login(){
      var error = ''
      var name = {}
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).
    catch(function(errors) {
        error= errors.message
       
    }).then(user=>{                 
      
           
      if(user){
        if(!user.displayName){
        db.collection("users").doc(user.user.email).get().then(query=>{
        name.username = query.data().username
       }).then(()=>{
        firebase.auth().currentUser.updateProfile({
        displayName:name.username})       
      })
      }
      this.$store.commit('login', user)
      this.$router.push('/home')
      }
      else{
        this.loginerror.message=error
        this.loginerror.state=true    
     }})
    
    },
    
    
        }}
  


  
</script>
