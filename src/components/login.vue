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
                  <p>{{error}}</p>
                  <v-text-field v-model="user.password"  prepend-icon="lock"  label="Password" type="password"></v-text-field>
                
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="autheticate" color="green accent-4">Login</v-btn>
                <v-btn @click="dialog=true" color="plight">SignUp</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    
    <!-- Register -->
    <v-card>
    <v-dialog v-model="dialog"  transition="dialog-bottom-transition">
      
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="pdark">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer> 
              </v-toolbar>
              <v-card-text>
                
                  <v-text-field v-model="newuser.email" prepend-icon="person"  label="E-Mail required " type="text"></v-text-field>
                  <p>{{error}}</p>
                  <v-text-field v-model="newuser.password" id="password" prepend-icon="lock"  label="Password" type="password"></v-text-field>
                  
                
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="register" color="success">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      
    </v-dialog>
    </v-card>
  </v-content>
</template>

<script>
import firebase from 'firebase'
import fire from '../db/firebaseinit'


export default {
  data () {
    return {
      dialog:false,
      newuser: {
        email: '',
        password: ''
      },
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods:{
    autheticate(){
     firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode,errorMessage)
  // ...
});
   this.$router.push('/')

    },
    register(){
    firebase.auth().createUserWithEmailAndPassword(this.newuser.email, this.newuser.password).catch(function(error) {
  // Handle Errors here.
  
  var errorCode = error.code;
  var errorMessage = error.message;
  return alert(errorMessage)
  // ...
})
 alert('Registration succesful')
this.dialog=false

    }
  }
}

  
</script>
<style scoped>
p{
  color:red!important
}
</style>
