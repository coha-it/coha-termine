<template lang="pug">
v-app
  v-main
    router-view(v-if="events", :events="events")
</template>

<script>
import axios from "axios"
const csvToJson = require("convert-csv-to-json")

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
      if (typeof dateString !== "string") return "";
      let d = dateString.split(".");
      let dat = new Date(d[2] + "-" + d[1] + "-" + d[0]);
      return dat;
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
        let json = csvToJson.utf8Encoding().csvStringToJson(data)

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
