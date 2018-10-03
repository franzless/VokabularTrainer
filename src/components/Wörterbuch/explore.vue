<template>
<div>
    <my-toolbar></my-toolbar>
    <v-container fluid grid-list-md class="amber lighten-5">
    <v-data-iterator
    :items="lists"
     content-tag="v-layout"
     :rows-per-page-items="rowsPerPageItems"
     :pagination.sync="pagination"
      row
      wrap
      
    >
    <v-toolbar color="plight" slot="header"><v-toolbar-title>Newest</v-toolbar-title></v-toolbar>
    <v-flex slot="item" slot-scope="props" xs12  sm6  md4  lg2  >
    <v-card @click.native="startList(props.item.Lname)" :style="{ cursor: 'pointer'}">
        <v-card-title  class="subheading font-weight-bold cursor">{{props.item.Lname}}</v-card-title>
         <v-divider></v-divider>
         <v-list dense >
             <v-list-tile >
             <v-list-tile-content><v-icon color="pdark">create</v-icon></v-list-tile-content>
             <v-list-tile-content >{{props.item.createdAt.toDate()}}</v-list-tile-content>
             </v-list-tile>
             <v-list-tile>
             <v-list-tile-content><v-icon color="secondary">account_circle</v-icon></v-list-tile-content>
             <v-list-tile-content >{{props.item.uid.username}}</v-list-tile-content>
             </v-list-tile>
             <v-list-tile>
             <v-list-tile-content><v-icon color="primary">touch_app</v-icon></v-list-tile-content>
             <v-list-tile-content >{{props.item.clicks}}</v-list-tile-content>
             </v-list-tile>
             <v-list-tile>
             <v-list-tile-content><v-icon color="plight">settings</v-icon></v-list-tile-content>
             <v-list-tile-content >{{props.item.words}}</v-list-tile-content>
             </v-list-tile>
         </v-list>
        
    </v-card>
    </v-flex>
    </v-data-iterator>
    </v-container>
    <v-container fluid grid-list-md>
    <v-data-iterator
    :items="lists"
     content-tag="v-layout"
      row
      wrap
    >
    <v-toolbar color="plight" slot="header"><v-toolbar-title>Most Popular</v-toolbar-title></v-toolbar>
    <v-flex slot="item" slot-scope="props" xs12  sm6  md4  lg3  >
   
    </v-flex>
    </v-data-iterator>
    </v-container>
    <v-dialog v-model="dialog" width="400">
        <v-card color="plight">
            <v-toolbar flat dark color="pdark"><v-icon color="secondary">list</v-icon><v-toolbar-title >{{title}}</v-toolbar-title></v-toolbar>
            <v-card-text>
                <v-list class="amber lighten-5">
                     
                    <v-list-tile  v-for="(word,index) in words" :key="index">
                        <v-list-tile-avatar size="30"><img src="../../assets/englisch.png" alt=""></v-list-tile-avatar>
                            <v-flex xs6>
                                <v-list-tile-content  class="text-lg-right">{{word.worden}}</v-list-tile-content>
                            </v-flex>
                        <v-divider vertical class="mx-3"></v-divider>
                                <v-list-tile-avatar size="30"><img src="../../assets/german.png" alt=""></v-list-tile-avatar>
                            <v-flex xs6>
                             <v-list-tile-content class="text-lg-right">{{word.wordde}}</v-list-tile-content>
                        </v-flex>

                    </v-list-tile>
                    
                    <v-divider></v-divider>
                    <v-list-tile>
                        <v-btn color="success" @click="startTest">Go</v-btn>
                        <v-btn color="error" @click="dialog=false">Cancel</v-btn>
                    </v-list-tile>
                </v-list>
            </v-card-text>
        </v-card>

    </v-dialog>
    
    
</div>
    
</template>
<script>
import db from '../../db/firebaseinit'
export default {
    data(){
        return{
            lists:[],
            popular:[],
            words:[],
            dialog:false,
            title:'',
            rowsPerPageItems:[5,10,15],
            pagination: {
            rowsPerPage: 4
                        },
            
            

        }
    },
    created(){
        this.getdata()
        
    },
    methods:{
        getdata(){
            db.collection("lists").where("public","==",true).get().then(query=>{
                query.forEach(doc=>{
                    this.lists.push({lid:doc.id,...doc.data()})
                })
            
            })
        },
        startList(name){
            this.words=[]
            this.title=name
            var list= this.lists.filter(list=> list.Lname === name)
                db.collection("lists").doc(list[0].lid).collection("words").get().then(query=>{
                query.forEach(doc=>{
                    this.words.push(doc.data())
                })
            }).then(()=>{
                this.dialog=true
            })
           
        },
        startTest(){
                        var data= []
            db.collection("lists").where("Lname","==",this.title).get().then(query=>{
                       query.forEach(doc=>{                           
                           data.push({docid:doc.id,
                           ...doc.data()})
                       })}).then(()=>{
                           this.$store.commit('listinfo',data)
                           this.$store.commit('addWords',this.words)
                           this.$router.push('/test')
                       })                 
            
        }
    }
    
}
</script>
