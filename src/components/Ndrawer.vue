<template>
<div>
    
    <v-navigation-drawer v-model="drawer"  permament app class="primary"  value="true">
        <v-list>
            <v-list-tile>
                <v-list-tile-action>
                    <v-icon color="secondary">home</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile>
            
            <v-list-group sub-group no-action value="true">
                <v-list-tile slot="activator">
                    <v-list-tile-action>
                        <v-icon color="secondary">language</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Dictionary</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                v-for="(vokabel, i) in vokabeln"
                :key="i">
                <v-list-tile-title>{{vokabel.text}}</v-list-tile-title>
                <v-list-tile-action>
                    <v-icon color="secondary">{{vokabel.icon}}</v-icon>
                </v-list-tile-action>
                </v-list-tile>
            </v-list-group>
            <v-list-group sub-group no-action value="true">
                <v-list-tile slot="activator">
                    <v-list-tile-action><v-icon color="secondary">storage</v-icon></v-list-tile-action>
                    <v-list-tile-title>Fragenkatalog</v-list-tile-title>

                </v-list-tile>
                <v-list-tile 
                v-for="(frage,index) in fragen"
                :key="index">
                <v-list-tile-title >{{frage.text}}</v-list-tile-title>
                <v-list-tile-action><v-icon color="secondary">{{frage.icon}}</v-icon></v-list-tile-action>
                </v-list-tile>
            
            </v-list-group>
        </v-list>
        
    </v-navigation-drawer>
   
</div>
    
</template>
<script>
export default {
    data(){        
        return{
            vokabeln:[{text:'Train',icon:'play_arrow'},{text:'Explore',icon:'explore'},{text:'Share',icon:'cached'}],
            fragen:[{text:'NeueFrage erstellen',icon:'build'},{text:'Test erstellen/bearbeiten',icon:'create'},{text:'Test starten',icon:'play_arrow'}],
            drawer:true

        }
    }
}
</script>
