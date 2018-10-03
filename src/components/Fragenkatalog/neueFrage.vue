<template>
<div>
<v-container style="max-width: 800px">
    <v-text-field v-model="frage" label="Erstelle eine neue Frage" solo></v-text-field>
    <v-text-field v-if="remaining > 0" v-model="antwort" label="Erstelle eine Antwort" solo @keydown.enter="AddAntwort">
         <v-fade-transition slot="append">
            <v-icon
            v-if="antwort"
            @click="addAntwort"
            >
            add_circle
            </v-icon>
      </v-fade-transition>
    </v-text-field>
     <h2 class="display-1 success--text pl-3">
      Antworten:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`antworten-${antworten.length}`">
          {{ antworten.length }}
        </span>
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
        <v-card v-if="completed > 0">
            <v-slide-y-transition
                class="py-0"
                group
                tag="v-list"
                two line
                           >                                      
                
                    <v-list-tile v-for="antwort in antworten" :key="antwort.id">
                        <v-list-tile-action>
                            
                            <v-text-field  prepend-icon="grade" color="blue" v-model="antwort.text" @click:prepend="lockTrue(antwort.text)"></v-text-field>
                           
                        </v-list-tile-action>
                    </v-list-tile>
               
            
       </v-slide-y-transition>     
        </v-card>
        <br>
        <v-btn color="success" v-if="remaining==0" @click="finish">Frage erstellen</v-btn>
    </v-container>    

</div>   
</template>
<script>
export default {
  data() {
    return {
      antworten: [],
      antwort: "",
      frage: "",
      richtige: ""
    };
  },
  computed: {
    remaining() {
      return 4 - this.antworten.length;
    },
    completed() {
      return this.antworten.length;
    },
    progress() {
      return (this.completed / 4) * 100;
    }
  },
  methods: {
    addAntwort() {
      var id = this.antworten.length + 1;
      this.antworten.push({
        id: id,
        text: this.antwort
      });
      this.antwort = "";
    },
    lockTrue(value) {
      this.richtige = value;
      console.log(this.richtige);
    },
    finish() {
      if (this.richtige || this.frage) {
        alert("ok");
      } else {
        alert("Frage oder Richtige Antwort fehlt");
      }
    },
    
  }
};
</script>
<style scoped>
</style>
