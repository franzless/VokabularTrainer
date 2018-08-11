<template>
<div>
    <v-container>
    <v-card class="elevation-20">
    <v-card-title>
      <div class="title">My Words</div>      
      <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
            
    <v-data-table
        :headers="headers"
        :items="words"
        :search="search"
        class="elevation-1"
        pagination.sync="pagination"
        item-key="wordde"
        hide-actions
        total-items="5"
        
    >
    <template slot="headerCell" slot-scope="props">
      <em class="title">{{props.header.text}}</em>
        
    </template>
    <template slot="items" slot-scope="props">
                    <td>             
                        <v-checkbox
                        v-model="props.item.value"
                        primary
                        hide-details
                        color="primary"
                        ></v-checkbox>
                    </td> 
                    <td>{{ props.item.wordde }}</td>
                    <td>{{ props.item.worden }}</td>
                    <td>{{ props.item.list }}</td>
                     
    </template>
    <template slot="footer">
                    <td colspan="100%">
                        <v-btn @click="newlist" color="primary">Create new List
                        </v-btn>
                    </td>
    </template>    
    </v-data-table>
    
    </v-card>
    <v-layout align-center justify-center row>
    <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
             <v-toolbar card color="primary"><v-icon>book</v-icon><v-toolbar-title>New List</v-toolbar-title></v-toolbar>
            <v-container grid-list-xl>
                <v-layout >
                    <v-flex xs6>
                       
                    <v-text-field v-model="listname" label="Name of new List"></v-text-field>
                    <v-switch color="primary" v-model="mode" label="Public" value="public"></v-switch>
                    <v-btn color="primary" @click="newlist">Create</v-btn>
                    <v-btn @click="dialog=false" color="error">Cancel</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
    </v-layout>
   </v-container>
</div>
</template>
<script>
import db from '../db/firebaseinit'
export default {
    data(){
        return{
            headers:[{text:'New List',value:'value', sortable:false},{text:'German',value:'wordde'},{text:'English',value:'worden'},{text:'List-Name',value:'list'}],
            words:[],
            search:'',
            dialog:false,
            listname:'',
            mode:''
        }
    },
    created(){
       db.collection("words").get().then(querySnapshot =>{
           querySnapshot.forEach(doc=>{
               this.words.push(doc.data())
           })
       })
       
       
              
   },
   methods:{
       newlist(){
           this.dialog=true
       }
   }
    
}
</script>
