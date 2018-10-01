<template>
<div id="home">

<my-drawer ></my-drawer>

<v-parallax height="900" :src="require('@/assets/text2.jpg')">
<v-layout justify-center align-center>
    
    <v-flex xs12 sm9 md7 lg4>
        <v-toolbar color="plight"><v-icon size="45" color="secondary">loyalty</v-icon><v-toolbar-title>Invite someone</v-toolbar-title></v-toolbar>
<v-card>
    
    <v-card-text>
        <v-text-field v-model="email" label="Email" prepend-icon="person"></v-text-field>
        <v-btn @click="invite" color="success">Send invite</v-btn>
    </v-card-text>
    
</v-card>
</v-flex>
</v-layout>
</v-parallax>
<v-footer class="primary">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by Marcel Brodbeck
            </div>
          </v-flex>
        </v-layout>
</v-footer>

<v-snackbar v-model="snackbar" bottom :timeout="timeout" color="red">
    <v-icon >error</v-icon> Please enter valid Email-Adress first
</v-snackbar>
<v-snackbar v-model="confirm" bottom :timeout="timeout" color="success">
    <v-layout justify-center><v-icon class="mr-2" >info</v-icon> Invite was sent out</v-layout>
   </v-snackbar>      
</div>
    
</template>
<script>
import db from '../db/firebaseinit'
import drawer from './Ndrawer'
export default {
    components:{'my-drawer':drawer},
    data(){
        return{
            email:'',
            snackbar:false,
            confirm:false,
            timeout:6000,
            token:''
        }
    },
    
methods:{
    invite(){
        var today = new Date()
        if(!this.email){
            this.snackbar=true
        }else{
                this.createToken()
                
                db.collection("tokens").doc(this.token).set({
                        createdAt:  today,
                        validUntil: new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
                     })
               .then(()=>{
                   // Security missing for Server credentials https://www.smtpjs.com/
                    Email.send("vokabularinfo@gmail.com",
                        this.email,
                        "Registration",
                        "To create an Account click the following link: http://localhost:8080/register/"+this.token,
                        "smtp.elasticemail.com",
                        "vokabularinfo@gmail.com",
                        "bbab9384-fd30-4161-85ce-0df6972fc587");
                    this.confirm=true    
                })
            
            
                   
        }
    },
    createToken(){
      this.token= Math.random().toString(36).substr(2)
      this.token=this.token + Math.random().toString(36).substr(2)
       
    }
}   
}


</script>
