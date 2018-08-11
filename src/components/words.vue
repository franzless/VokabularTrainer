<template>
<div>
    <v-data-table
        headers="headers"
        items="items"
        hide-actions
        class="elevation-1"
        pagination.sync="pagination"
        item-key="id"
        search="search"
    >
    <template slot="items" slot-scope="props">
                    
                    <td>{{ props.item.german }}</td>
                    <td>{{ props.item.english }}</td>
                    <td>{{ props.item.list }}</td>
                    <td>
        <v-checkbox
          v-model="props.item.value"
          primary
          
          
        ></v-checkbox>
        
    </v-data-table>

</div>
<template>
<script>
export default {
    data(){
        return{
            headers:[{value:'value'},{text:'german',value:'german'},{text:'english',value:'english'},{text:'list',value:'list'
            }]

        }
    }
    
}
</script>
