<template lang="pug">
v-app
  v-main
    router-view(v-if="events", :events="events")
</template>

<script>
import axios from "axios"

export default {
  name: "App",

  data: function () {
    return {
      events: null,
    };
  },

  methods: {
    convertDate(dateString) {
      //  Convert a "dd.MM.yyyy" string into a Date object
      if (typeof dateString === "string" && dateString != "") {
        const date_array = dateString.split(".");
        const month = date_array[1]
        const year = date_array[2]
        const day = date_array[0]
        return new Date(`${year.length > 2 ? year : '20'+year}-${month}-${day}`)
      }
      return "";
    },
  },

  created: function () {
    axios({
      method: "GET",
      url: process?.env?.VUE_APP_FILENAME,
      data: {},
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then(
      (response) => {
        let data = response.data
        let json = data

        this.events = json.map((event) => {
          console.log(typeof event.start);
          event.start = this.convertDate(event.start);
          event.end = this.convertDate(event.end);
          return event;
        });

        console.log(this.events);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>
