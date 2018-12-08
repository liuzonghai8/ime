<template>
   <v-card>

       <v-tooltip bottom>
      <v-btn  >
        dsfsdfds
      </v-btn>
         <span>Left tooltip</span>
      </v-tooltip> 
    

<v-tooltip bottom >
      <v-btn
        slot="activator"
        
        dark
      >
      <v-icon>fas fa-asterisk</v-icon>
        <v-icon >fas fa-expand</v-icon>
        Left
      </v-btn>
      <span>提示内容</span>
    </v-tooltip>

     <v-btn icon @click="dd">
            <i class="fas fa-stroopwafel"></i> 
             
           
          </v-btn>
          <v-btn icon >
            <v-icon color="teal darken-1">check</v-icon>
          </v-btn>
   </v-card>
</template>
<script>
export default {
    
}
</script>
