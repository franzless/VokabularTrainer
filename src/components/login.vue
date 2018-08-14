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
                <v-btn @click="dialog=true" color="plight">SignUp</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    
    <!-- Register -->
    
    <v-dialog v-model="dialog"  transition="dialog-bottom-transition" max-width="650" persistent>
      
        
            <v-card >
              <v-toolbar dark color="pdark">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer> 
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                
                  <v-text-field required v-model="newuser.email" prepend-icon="person"  label="E-Mail" type="text" :rules="emailRules"></v-text-field>
                  <v-text-field v-model="newuser.username" prepend-icon="android"  label="Username" type="text" :rules="[v => !!v || 'Username is required']"></v-text-field>
                  
                  <v-text-field v-model="newuser.password" prepend-icon="lock"  label="Password" type="password" :rules="[v => !!v || 'Password is required']"></v-text-field>
                  <v-text-field v-model="newuser.password2"  prepend-icon="lock"  label="Repeat Password" type="password" :rules="[v => !!v || 'Password is required']"></v-text-field>
                  <v-alert  transition="scale-transition" type="error" :value="error.state" dismissible>{{error.message}}</v-alert>
                </v-form>  
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid,loading" @click="register" color="success"  :loading="loading">Register</v-btn>
                <v-btn @click="dialog=false" :disabled="loading" :loading="loading" color="error">Cancel</v-btn>
              </v-card-actions>
            </v-card>
         
    </v-dialog>
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="secondary"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    
  </v-content>
</template>

<script>
import firebase from 'firebase'
import fire from '../db/firebaseinit'


export default {
  data () {
    return {
      dialog:false,
      loading:false,
      valid:true,
      loginerror:{
        state:false,
        message:''
      },
      newuser: {
        email: '',
        password: '',
        password2:'',
        username:'',

      },
      user: {
        email: '',
        password: ''
      },
      error:{
        state:false,
        message:''
      },
       emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods:{
    login(){
      var error = ''
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).catch(function(errors) {
  // Handle Errors here.
      
      var errorCode = errors.code;
      var errorMessage = errors.message;
      
      error= errorMessage
      
  // ...
    }).then(user=>{
      console.log(user)
      if(user){
      this.$store.commit('login', user)
      this.$router.push('/home')}
      else{
        this.loginerror.message=error
        this.loginerror.state=true    
       
      }

    })
    
    },
    
    register(){
      this.loading=true
      var problem = ''
     if(this.newuser.password !== this.newuser.password2 || !this.newuser.password){
        this.error.state=true
        this.error.message = 'Password is not the same'
        this.loading=false
      }else if(!this.newuser.username || !this.newuser.email){
        this.error.state=true
        this.error.message='Email and Username are required'
        this.loading=false
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(this.newuser.email, this.newuser.password).catch(function(errors) {
          // Handle Errors here.
          var errorCode = errors.code;
          var errorMessage = errors.message;
          problem = errorMessage  
      }).then(user=>{
        if(user){
        this.loading=false
        this.$router.push('/login')
        }else{
          this.loading=false
          this.error.state=true
          this.error.message=problem
        }
      })
        
        
      }

    }
  },
  }


  
</script>
