<template>
<div class="test">
    
        <v-card>
          <v-navigation-drawer class="pdark" value="true" stateless >
         <v-list>
            <v-list-tile  tag="span" ripple to="/home" >
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
                :key="i"
                :to="vokabel.route"
                ripple>
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
                ripple
                :key="index"
                :to="frage.route">
                <v-list-tile-title >{{frage.text}}</v-list-tile-title>
                <v-list-tile-action><v-icon color="secondary">{{frage.icon}}</v-icon></v-list-tile-action>
                </v-list-tile>
            
            </v-list-group>
        </v-list> 
        
    </v-navigation-drawer>
    
   </v-card>
</div>
    
</template>
<script>
export default {
    data(){        
        return{
            vokabeln:[{text:'Train',icon:'play_arrow',route:'/newtest'},{text:'Explore',icon:'explore',route:'/explore'},{text:'Share',icon:'cached'},{text:'MyWords',icon:'list',route:'/words'}],
            fragen:[{text:'NeueFrage erstellen',icon:'build',route:'/neuefrage'},{text:'Test erstellen/bearbeiten',icon:'create'},{text:'Test starten',icon:'play_arrow'}],
            drawer:true,
            mini:true,
            admins: [
        ['Management', 'people_outline'],
        ['Settings', 'settings']
      ],
      cruds: [
        ['Create', 'add'],
        ['Read', 'insert_drive_file'],
        ['Update', 'update'],
        ['Delete', 'delete']
      ]

        }
    }
}
</script>
<style scoped>
.test{
    height:50em;
    display:flex;
    align-items: center;
   
}
</style>
