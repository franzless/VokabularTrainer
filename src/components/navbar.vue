<template>
<div id="navbar">
<v-toolbar color="primary">
    <v-toolbar-title >
    <router-link to="/home" tag="span" style="cursor:pointer"><v-icon color="secondary" >language</v-icon>  Your Dictionary</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn router flat to="/words">
            <v-icon color="secondary" left>list</v-icon>
            Add
        </v-btn>
        <v-btn flat router to="/newTest">
            <v-icon color="secondary" left>play_arrow</v-icon>
            Train
        </v-btn>
        <v-btn flat >
            <v-icon color="secondary" left>explore</v-icon> 
            Explore
        </v-btn>
        <v-btn flat >
            <v-icon color="secondary" left>cached</v-icon> 
            Share
        </v-btn>
    </v-toolbar-items>
</v-toolbar>

</div>
    
</template>
<script>
export default {
    
}
</script>
