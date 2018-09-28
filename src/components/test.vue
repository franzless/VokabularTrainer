<template>
<div>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout column wrap>
            <v-flex
              v-for="(frage,i) in fragen"
              :key="i"
              xs4
              d-flex
            >
              <v-card flat tile class="d-flex">
                  <v-card-text>
                  <v-text-field :value="frage.frage" disabled></v-text-field>
                  </v-card-text>
               <v-card-actions>
               <v-radio-group v-model="frage.test">
                   <v-radio :label="frage.antwort" :value="frage.antwort"></v-radio>
                   <v-radio :label="frage.antwort2" :value="frage.antwort2"></v-radio>
                   <v-radio :label="frage.antwort3" :value="frage.antwort3"></v-radio>
                   <v-radio :label="frage.antwort4" :value="frage.antwort4"></v-radio>
               </v-radio-group>
               </v-card-actions>   
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</div>
    
</template>
<script>
export default {
    data(){
        return{
            fragen:[{frage:'frage',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},]
                     
        }},
        

       
    
}
</script>
