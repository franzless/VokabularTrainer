<template>
<div>
    <my-toolbar></my-toolbar>
   
    <v-layout justify-center fill-height row>
        <v-flex xs9 sm6 >
    <v-card color="orange" class="elevation-5">
        
        <v-card-title >
            
           
           
            <v-combobox  label="Fragenkatalog"></v-combobox>
            <v-tooltip bottom>
            <v-btn fab slot="activator"><v-icon>build</v-icon></v-btn>
            <span>ausgewählten Fragenkatalog bearbeiten</span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn slot="activator" fab><v-icon>play_circle_filled</v-icon></v-btn>
                <span>ausgewählten Fragenkatalog starten</span>
            </v-tooltip>
            <v-tooltip bottom>
                <span>Neuen Fragenkatalog erstellen, dazu bitte die Fragen abhaken und den Namen bestimmen</span>
                <v-btn fab slot="activator" ><v-icon>add</v-icon></v-btn>
            </v-tooltip>
            
            
            
        </v-card-title>
        <v-card-actions>
            <v-divider></v-divider>
            <br>
        </v-card-actions>
        <v-card-actions>
             <v-expansion-panel popout >
        <v-expansion-panel-content v-for="(test,i) in tests" :key="i">
            <div slot="header">
                <v-layout row align-center>
                    <v-checkbox :label="test.frage"></v-checkbox><v-btn flat ><v-icon>edit</v-icon></v-btn>
                </v-layout>
                
                
            </div>
            <v-list>
                <v-list-tile >
                    <v-list-tile-content>
                        {{test.antwort}}
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile >
                    <v-list-tile-content>
                        {{test.antwort2}}
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile >
                    <v-list-tile-content>
                        {{test.antwort3}}
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile >
                    <v-list-tile-content>
                        {{test.antwort4}}
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-expansion-panel-content>
        </v-expansion-panel>
        </v-card-actions>
    </v-card>
   
    
    
    <br>
   
        </v-flex>
        
        </v-layout>   
</div>
    
</template>
<script>
export default {
    data(){
        return{
            tests:[{frage:'frage',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage2',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage3',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage4',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},
                    {frage:'frage5',antwort:'test',antwort2:'antwort2',antwort3:'antwort3',antwort4:'antwort4',richtig:'antwort',test:''},]
        }
    }
}
</script>
