import axios from "axios";

export default {
  name: "LoadEvents",

  data: function () {
    return {
      events: [],
    };
  },

  methods: {
    convertDateGerman(dateString) {
      //  Convert a "dd.MM.yyyy" string into a Date object
      if (typeof dateString === "string" && dateString != "") {
        const date_array = dateString.split(".");
        const month = date_array[1];
        const year = date_array[2];
        const day = date_array[0];
        return new Date(
          `${year.length > 2 ? year : "20" + year}-${month}-${day}`
        );
      }
      return "";
    },

    mergeDateAndTime (date, time) {
      if (date) {
        const d = date.split('T')[0]
        if (date && time) {
          const t = time.split('T')[1].split('.')[0]
          return `${d} ${t}`
        } else {
          return `${d}`
        }
      }
      return null
    } 
  },

  created: function () {
    axios({
      method: "GET",
      url: process?.env?.VUE_APP_API + process?.env?.VUE_APP_FILENAME,
      data: {},
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }).then(
      (response) => {
        let json = response.data;

        this.events = json.map((event) => {
          event.start = this.mergeDateAndTime(event.Startdatum, event.Startuhrzeit)
          delete event.Startdatum
          delete event.Startuhrzeit

          event.end = this.mergeDateAndTime(event.Enddatum, event.Enduhrzeit)
          delete event.Enddatum
          delete event.Enduhrzeit

          const name = event.Titel
          delete event.Titel
          event.name = `${name}${event.Ort ? ' in ' + event.Ort : ''}`

          event.color = event.Farbe
          delete event.Farbe

          event.category = event.Kategorie
          delete event.Kategorie

          return event
        });

        console.log(this.events);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
