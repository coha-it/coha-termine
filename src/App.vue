<template lang="pug">
v-app
  v-main
    router-view(v-if="events" :events="events")
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data: function() {
    return {
      events: null
    }
  },
  
  created: function () {
    axios
      .get(
        process?.env?.VUE_APP_FILENAME
        /*{
          headers: { "x-dsi-restful": 1 }
        }*/
      )
      .then(
        (response) => {
          this.events = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
};
</script>
