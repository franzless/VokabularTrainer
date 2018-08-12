<template>
<div>
    <my-toolbar></my-toolbar>
    <v-container>
    <v-card class="elevation-20" color="pdark">
    <v-card-title>
      <div class="title">My Words
      <v-icon left color="secondary">language</v-icon>
      </div>      
      <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            dark
            color="black"
        ></v-text-field>
    </v-card-title>
       <!-- Dialog for adding new/editing data    -->
    <v-divider></v-divider>
    <v-dialog v-model="dialog1" max-width="500px" persistent>
        <v-btn  slot="activator" color="primary" dark class="mr-2">
            <v-icon class="mr-2" color="secondary">build</v-icon>New Word</v-btn>
        <v-card>
          <v-toolbar color="pdark"><v-toolbar-title class="mr-2">{{formTitle.title}}</v-toolbar-title><v-icon  color="secondary">{{formTitle.icon}}</v-icon></v-toolbar>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-layout justify-center >
              
            <v-flex sm8>
                <v-text-field box v-model="editedItem.wordde">{{formTitle.title}}
                </v-text-field>
            </v-flex>
            <v-avatar size="50" ><img src="../assets/german.png" alt="">    
                </v-avatar>
            </v-layout>
        
        <v-layout row justify-center  >
          
            <v-flex sm8>
                <v-text-field box  v-model="editedItem.worden" >

                </v-text-field>
            </v-flex>
            <v-avatar size="50"><img src="../assets/englisch.png" alt="">    
                </v-avatar>
            </v-layout>
                 </v-layout>
            </v-container>
             
          </v-card-text>
          <v-alert type="info" :value="true">
                    Lists can be edited on "Share"
                </v-alert>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error"  @click.native="cancel">
                <v-icon dark>remove_circle</v-icon></v-btn>
            <v-btn color="plight" :disabled="loading" :loading="loading"  @click.native="addwords" @click.stop="loading=true">
                <v-icon dark>{{formTitle.icon}}</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!--  end -->         
    <v-data-table
        :headers="headers"
        :items="words"
        :search="search"
        class="elevation-1"
        pagination.sync="pagination"
        item-key="wordid"
        hide-actions
        dark
        :loading=true
        
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
                    <td class="justify-center ">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(props.item)"
                            color="yellow"
                        >
                            edit
                        </v-icon>
                        <v-icon
                            small
                            :disabled="loading" :loading="loading"
                            @click="deleteItem(props.item)"
                            color="plight"
                        >
                            delete
                        </v-icon>
                    </td>
                     
    </template>
    <template slot="footer">
                    <td colspan="100%">
                        <v-btn  @click="newlist" color="plight"><v-icon class="mr-2" color="secondary">build</v-icon> Create new List
                        </v-btn>
                    </td>
    </template>    
    </v-data-table>
    <!-- dialog for new lists -->
    
    </v-card>
    <v-layout align-center justify-center row wrap>
    <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
             <v-toolbar card color="primary"><v-icon color="secondary">book</v-icon><v-toolbar-title>New List</v-toolbar-title></v-toolbar>
            <v-container grid-list-xl>
                <v-layout >
                    <v-flex xs6>
                       
                    <v-text-field v-model="listname" label="Name of new List"></v-text-field>
                    <v-switch color="black" v-model="mode" label="Public" value="public"></v-switch>
                    <v-btn color="primary" @click="newlist">Create</v-btn>
                    <v-btn @click="dialog=false" color="error">Cancel</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
     
    </v-dialog>
    <!-- end dialog lists -->
    <!-- loading dialog -->
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="secondary"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- end loading -->
    </v-layout>
   </v-container>
</div>
</template>
<script>
import db from '../db/firebaseinit'
export default {
    data(){
        return{
            headers:[{text:'New List',value:'value', sortable:false},{text:'German',value:'wordde'},{text:'English',value:'worden'},{text:'List-Name',value:'list'},{text:'Actions',value:'name',sortable:false}],
            words:[],
            search:'',
            dialog:false,
            dialog1:false,
            listname:'',
            mode:'',
            editedIndex: -1,
            editedItem:{wordde:'',worden:'',wordid:''},
            defaultItem:{wordde:'',worden:'',wordid:''},
            loading:false
        }
    },
    created(){
       this.updatedata()
       
       
              
   },
   computed: {
      formTitle () {
        return {title:this.editedIndex === -1 ? 'New Word' : 'Edit Word',
                icon: this.editedIndex === -1 ? 'add_circle_outline' : 'edit'}
      }
    },
   methods:{
       deleteItem(item){
            const index = this.words.indexOf(item)
            var conf = confirm('Are you sure you want to delete this item?')
            if (conf === true) {
           db.collection("words").doc(this.words[index].wordid).delete()
           .then(()=>{
               this.loading=true
               this.updatedata()
           })}
       },
       cancel(){
           this.dialog1=false
           setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
       },
       newlist(){
           this.dialog=true
       },
       editItem (item) {
        this.editedIndex = this.words.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog1 = true
      },
      addwords(){
            if(this.editedIndex === -1){           
            if(this.editedItem.wordde != '' && this.editedItem.worden != ''){
               
                db.collection("words").doc().set({
                    wordde:this.editedItem.wordde,
                    worden:this.editedItem.worden,
                }).then(()=>{
                    this.updatedata()
                }) 
                    this.editedItem.wordde=''
                    this.editedItem.worden=''
                }
            else{alert('Enter words first')
            }}
            else{
                db.collection("words").doc(this.editedItem.wordid).set({
                    wordde:this.editedItem.wordde,
                    worden:this.editedItem.worden,
                }).then(()=>{
                    this.updatedata()
                    this.dialog1=false
                }) 

            }
            
                
        },
    updatedata(){
        this.words = []
        const id= []
        const data = []
        db.collection("words").get().then(querySnapshot =>{
           querySnapshot.forEach(doc=>{
               data.push(doc.data())
               id.push(doc.id)

           })
        }).then(()=>{
               this.words = data.map((val,ind,arr)=>{
                   return{
                       wordde:val.wordde,
                       worden:val.worden,
                       wordid:id[ind]
                   }
               })
              })
       
    }
            },
    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 2000)
      }}
    }

</script>
