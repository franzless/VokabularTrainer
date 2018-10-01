<template>
<div>
    <my-toolbar></my-toolbar>
   
    <v-parallax height="600" :src="require('@/assets/text2.jpg')">
    <v-layout align-center justify-center column wrap>
        <img src="../assets/globe.png" width="100" >
        <br><br><br><br>
         <div class="display-2 font-weight-regular.font-italic">Your Dictionary
         <v-icon color="yellow accent-4" size=45>language</v-icon ></div>
         <br>  
         <v-btn router to="/login" large color="primary">Start now</v-btn>
         
    </v-layout>
    </v-parallax>
    <v-layout column align-center class="my-5">
        <v-flex >
            <v-card class="elevation-15">
                <v-card-text class="text-xs-center">
                    <v-icon color="orange" x-large>accessibility</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center"><div class="headline">Flexible learning of a new Language</div> </v-card-title>
                <v-card-text class="text-xs-center">Ever been travelling for a few weeks, but you just could not remember any words? Or just want to start to learn a few basics before you start? We offer you the possibility to save words into your dictionary and practice them there. It's quick and you will remember those words! We also offer you preset word lists for a quick start into a new language</v-card-text>

            </v-card>
        </v-flex>

    </v-layout>
    <v-container grid-list-xl>
        <v-layout  row wrap >
            <v-flex xs12 md4>
             
             <v-card class="elevation-10">
                 <v-card-text class="text-xs-center">
               <v-icon color="primary" x-large>build</v-icon>
               </v-card-text>
               <v-card-title primary-title class="layout justify-center">
                   <div class="headline">Build your own Dictionary</div></v-card-title>
               <v-card-text class="text-xs-center">
                   Create your own Dictionary by adding words, you want to learn, into it.
                   You can create lists of words in your dictionary and run tests. The Process is easy and fast. For additional motivation you can run a timer and you also have insight to different statistics of your progress
                   </v-card-text>
                   <v-card-actions class="layout justify-center"><v-btn color="yellow accent-4">Create</v-btn></v-card-actions>  
             </v-card>   
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="elevation-10" height="310" >
                    <v-card-text class="text-xs-center">
                    <v-icon color="primary" x-large>cached</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center"> <div class="headline">Share your lists </div></v-card-title>
                    <v-card-text class="text-xs-center">
                        You can flag your lists as private or public.
                        Public lists are available for other people. If people like your lists and find them useful they can rate your lists. 
                        </v-card-text>
                        <br>  
                    <v-card-actions class="layout justify-center"><v-btn color="yellow accent-4">Share</v-btn></v-card-actions>
                </v-card>
                
            </v-flex>
            <v-flex xs12 md4>
                <v-card class="elevation-10" height="310">
                    <v-card-text class="text-xs-center">
                    <v-icon color="primary" x-large>explore</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Explore lists</div>  </v-card-title>
                    <v-card-text class="text-xs-center">
                         Get likes for your lists and explore lists of other people to make fast learning progress. Too lazy to create a new list ? Just search for some list that fits your needs</v-card-text>
                         <br> 
                    <v-card-actions class="layout justify-center"><v-btn color="yellow accent-4">Explore</v-btn></v-card-actions> 
                </v-card>
              
            </v-flex>
        </v-layout>
    </v-container>
    <br>
    <v-parallax height="380" :src="require('@/assets/test.jpg')">
    <v-layout align-center justify-center column wrap>
        <br>
        <div class="title text-xs-center">You don't learn a language by sitting in front of a machine. You have to go out, listen and speak.<br></div><br>
        <div class="subheading text-xs-center">
    We can give you help practicing words and so you can better interact and make faster progress.
         </div>
         <br><br>  
         <v-btn large router to="/login" color="primary">Try now</v-btn>
    </v-layout>
    </v-parallax>
   <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="yellow accent-4--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="yellow accent-4--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Chicago, US</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="yellow accent-4--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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
    
    
    
</div>    
</template>
<script>
export default {
    data(){
        return{
            img:'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
            img2:'../assets/test.jpg'
        }
    }    
}
</script>

     