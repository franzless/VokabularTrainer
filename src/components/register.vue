<template>
<div id="register">
    <v-parallax height="1000" :src="require('@/assets/register.jpg')">
    <v-container fluid fill-height>
    <v-layout justify-center align-center >
    <v-flex xs12 sm10 md8 lg4>
    <v-card>
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
                <v-select :rules="[v => !!v || 'Item is required']" prepend-icon="language" v-model="newuser.native" :items="lang" label="Native Language"></v-select>
                <v-alert  transition="scale-transition" type="error" :value="error.state" dismissible>{{error.message}}</v-alert>
                <v-alert  transition="scale-transition" type="success" :value="success" dismissible>Registration succesfull</v-alert>
            </v-form>  
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
        <v-btn :disabled="!valid" @click="register" color="success"  >Register</v-btn>
        
         </v-card-actions>
    </v-card>
    </v-flex>
    </v-layout>
    </v-container>
    </v-parallax>
</div>
    
</template>
<script>
import firebase from 'firebase'
import db from '../db/firebaseinit'
export default {
    data(){
        return{
            newuser: {
                email: '',
                password: '',
                password2:'',
                username:'',
                uid:'',
                native:''
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        error:{
        state:false,
        message:''
        },
        lang:['German','English','French'],
        valid:false,
        success:false
        
    }    
},
    methods:{
        register(){
            if (this.$refs.form.validate()) {
                if(this.newuser.password !== this.newuser.password2){
                this.error.state=true
                this.error.message = 'Password is not the same'
                }else{
                    var problem = ''
                    firebase.auth().createUserWithEmailAndPassword(this.newuser.email, this.newuser.password)
                        .then(user=>{
                             this.newuser.uid = user.user.uid
                        }).then(()=>{
                        db.collection("users").doc(this.newuser.email).set({
                            uid:this.newuser.uid,
                            username:this.newuser.username,
                            lang:this.newuser.native 
                        })}).then(()=>{
                            this.success=true
                            setTimeout(()=>{
                                this.$router.push('/login')
                            },3000)
                            
                    
                        }).catch(error=>{
                            problem = error.message
                        }).then(()=>{
                            this.error.state=true
                            this.error.message=problem
                        }) 

                }            
            }
       }
    }
}
</script>
