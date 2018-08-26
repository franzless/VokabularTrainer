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
            color="secondary"
        ></v-text-field>
    </v-card-title>
       <!-- Dialog for adding new/editing data    -->
    <v-divider></v-divider>
    <v-card-text>
        
    
    <v-dialog v-model="dialog1" max-width="500px" persistent>
        <v-btn  slot="activator" color="primary" dark class="mr-2">
            <v-icon class="mr-2" color="secondary">build</v-icon>New Word</v-btn>
        <v-card>
          <v-toolbar color="pdark"><v-toolbar-title class="mr-2">{{formTitle.title}}</v-toolbar-title><v-icon  color="secondary">{{formTitle.icon}}</v-icon></v-toolbar>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-layout justify-center align-left >
              
            <v-flex sm8>                
                <v-text-field prepend-icon="g_translate" box v-model="editedItem.wordde" @click:prepend="translate(editedItem.wordde)">{{formTitle.title}}
                </v-text-field>                
            </v-flex>
            <v-avatar size="50" ><img src="../assets/96/Germany.png" alt="">    
            </v-avatar>
            </v-layout>
        <v-layout row justify-center  >
            <v-flex sm8>
                <v-text-field box  v-model="editedItem.worden" >
                </v-text-field>
            </v-flex>
                 <v-avatar size="50"><img src="../assets/96/England.png" alt="">    
                 </v-avatar>
        </v-layout>
        <v-layout row justify-center>
            <v-flex sm8>
                <v-text-field box v-model="editedItem.category" label="Category(optional)"></v-text-field>
            </v-flex>
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
                <v-icon dark>cancel</v-icon></v-btn>
            <v-btn color="plight" :disabled="loading" :loading="loading"  @click.native="addwords" @click.stop="loading=true">
                <v-icon dark>{{formTitle.icon}}</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!--  end -->
    
    </v-card-text>        
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
                    <td>{{ props.item.category }}</td>
                    <td><v-icon color="red">sentiment_very_dissatisfied</v-icon>
                        <v-icon color="grey">adb</v-icon>
                        <v-icon color="green">insert_emoticon</v-icon></td>
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
                        <v-btn  @click="dialog=true" color="plight"><v-icon class="mr-2" color="secondary">build</v-icon> Create new List
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
                    <v-switch  color="secondary" v-model="mode" label="Public" ></v-switch>
                    <v-btn :disabled="loading" :loading="loading" color="primary" @click="newlist">Create</v-btn>
                    <v-btn :disabled="loading" :loading="loading" @click="dialog=false" color="error">Cancel</v-btn>
                    
                    
                    </v-flex>
                </v-layout>
                <v-alert type="error" v-model="error.state">
                    {{error.message}} 
                    </v-alert>
                <v-alert type="success" v-model="success">
                    New List succesfully created    
                    </v-alert>
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
<v-snackbar v-model="snackbar" top :timeout="timeout" color="red">
    <v-icon >error</v-icon>    Cannot translate empty line, please enter something first
   </v-snackbar>   
</div>
</template>
<script>
import db from '../db/firebaseinit'
import axios from 'axios'
export default {
    data(){
        return{
            headers:[{text:'New List',value:'value', sortable:false},{text:'German',value:'wordde'},{text:'English',value:'worden'},{text:'Category',value:'category'},{text:'Statistics',sortable:false},{text:'Actions',value:'name',sortable:false},],
            words:[],
            search:'',
            dialog:false,
            dialog1:false,
            listname:'',
            mode:'',
            editedIndex: -1,
            editedItem:{wordde:'',worden:'',wordid:'',category:''},
            defaultItem:{wordde:'',worden:'',wordid:'',category:''},
            loading:false,
            listid:'',
            error:{
                state:false,
                message:'New List Name is required and choose at least 5 Words for new List',
               
            },
            success:false,
            snackbar:false,
            timeout:6000,
            statisticsIcon:[]
            
            
        }
    },
    created(){
          this.updatedata()
     },
     

   computed: {
      formTitle () {
        return {title:this.editedIndex === -1 ? 'New Word' : 'Edit Word',
                icon: this.editedIndex === -1 ? 'add_circle_outline' : 'edit'}
      },
      loginid (){
          return this.$store.getters.login
      }
      
    },
   methods:{
       translate(e){
           if(!e){
               this.snackbar=true
           }else{
               axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180825T163250Z.3c6bbbd69e90b59f.458f06e8e709440823a3b83552dcd91b752056f6&text='+e+'&lang=de-en').then((response)=>{
                   
               this.editedItem.worden = response.data.text[0]    
               })
           }
           
       },
       deleteItem(item){
            const index = this.words.indexOf(item)
            var conf = confirm('Are you sure you want to delete this item?')
            if (conf === true) {
            this.loading=true
           db.collection("users").doc(this.loginid.email).collection("words").doc(this.words[index].wordid).delete()
           .then(()=>{
               this.updatedata()
               this.loading = false
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
           var data = this.words.map((val)=>{
               if (val.value){
                   return{
                       wordid:val.wordid,
                       worden:val.worden,
                       wordde:val.wordde
                   } 
               }
           }).filter(val=>
               val != undefined
           )
          
           if(!this.mode){
               this.mode=false
           }
           
           if(this.listname){
           var newlist =''
           db.collection("lists").add({
              Lname:this.listname,
              public:this.mode,
              uid:{username:this.loginid.displayName,uid:this.loginid.uid},
              clicks:0,
              words:data.length,
              createdAt:new Date (Date.now()) 
           }).then(res =>{
                newlist = res.id
           }).then(()=>{
              this.listid=newlist
              this.addwordstolist()
           })       
            }else{
                this.error.state = true
            }
                     },
       addwordstolist(){
    //Add selected words to new list

           var data = this.words.map((val)=>{
               if (val.value){
                   return{
                       wordid:val.wordid,
                       worden:val.worden,
                       wordde:val.wordde
                   } 
               }
           }).filter(val=>
               val != undefined
           )
           this.loading = true
           if(data.length<5){
               db.collection("lists").doc(this.listid).delete()
               this.error.state = true
           }else{
           data.forEach(word=>{
            db.collection("lists").doc(this.listid).collection("words").add(
                    word)
           })
               this.error.state=false
               this.success = true
               this.listname = ''
           }
        this.loading = false         
       },

       editItem (item) {
        this.editedIndex = this.words.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog1 = true
      },

      addwords(){
          //Add new word to Collection
            if(this.editedIndex === -1){           
            if(this.editedItem.wordde != '' && this.editedItem.worden != ''){
               this.loading = true
                db.collection("users").doc(this.loginid.email).collection("words").doc().set({
                    wordde:this.editedItem.wordde,
                    worden:this.editedItem.worden,
                    category:this.editedItem.category
                }).then(()=>{
                    this.updatedata()
                }) 
                    this.editedItem.wordde=''
                    this.editedItem.worden=''
                    this.editedItem.category=''
                }
            else{alert('Enter words first')
            }}
            else{
                this.loading = true
                db.collection("users").doc(this.loginid.email).collection("words").doc(this.editedItem.wordid).set({
                    wordde:this.editedItem.wordde,
                    worden:this.editedItem.worden,
                    category:this.editedItem.category,
                }).then(()=>{
                    this.updatedata()
                    this.dialog1=false
                }) 

            }
            
                
        },
    updatedata(){
        //Get words of user
        this.words = []
        
       
        this.loading = true
        db.collection("users").doc(this.loginid.email).collection("words").get().then(querySnapshot =>{
           querySnapshot.forEach(doc=> {
              this.words.push({wordid:doc.id,...doc.data()})           
             
           })
           })
            this.loading= false
            
    }






    /* watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 2000)
      }} */
    }}

</script>


