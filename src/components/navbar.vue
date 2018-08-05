<template>
<div id="navbar">
<v-toolbar color="primary">
    <v-toolbar-title>VokabularTrainer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn router flat to="/">
            <v-icon left>list</v-icon>
            Add new Words
        </v-btn>
        <v-btn flat router to="/test">
            <v-icon left>play_arrow</v-icon>
            Start training
        </v-btn>
    </v-toolbar-items>
</v-toolbar>

</div>
    
</template>
<script>
export default {
    
}
</script>
