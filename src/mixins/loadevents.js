import axios from "axios";

export default {
  name: "LoadEvents",

  data: function () {
    return {
      data: {
        events: [],
        earliest: null,
      }
    };
  },

  methods: {
    /*
    * Convert a "dd.MM.yyyy" string into a Date object
    */
    // convertDateGerman(dateString) {
    //   if (typeof dateString === "string" && dateString != "") {
    //     const date_array = dateString.split(".");
    //     const month = date_array[1];
    //     const year = date_array[2];
    //     const day = date_array[0];
    //     return new Date(
    //       `${year.length > 2 ? year : "20" + year}-${month}-${day}`
    //     );
    //   }
    //   return '';
    // },

    mergeDateAndTime(date, time) {
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
    },

    htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html")
      return doc?.documentElement?.textContent ?? input
    },
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

        this.data.events = json.map((event) => {
          event.start = this.mergeDateAndTime(event.Startdatum, event.Startuhrzeit)
          delete event.Startdatum
          delete event.Startuhrzeit

          event.end = this.mergeDateAndTime(event.Enddatum, event.Enduhrzeit)
          delete event.Enddatum
          delete event.Enduhrzeit

          const name = this.htmlDecode(event.Titel)
          delete event.Titel
          event.name = `${name}${event.Ort ? ' in ' + event.Ort : ''}`

          event.color = event.Farbe
          delete event.Farbe

          event.category = event.Kategorie
          delete event.Kategorie

          return event
        });

        this.data.earliest = this.data?.events?.reduce((a, b) => { return a < b.start ? a : b.start })
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
