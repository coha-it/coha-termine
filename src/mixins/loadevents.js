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

    getColorByCategory (cat) {
      const colors = {
        // "Offenes Programm"      : '#FED118',
        "Offenes Programm"      : 'blue lighten-4',
        "Botschaftertreffen"    : 'amber lighten-3',
        // "Seminar"               : '',
        "Workshop"              : 'blue-grey lighten-1',
        "Impulsabend"           : 'orange darken-2',
        "Keynote"               : 'yellow darken-1',
        "Leitbild-Abend"        : 'blue-grey lighten-2',
        "Unternehmerwanderung"  : 'brown lighten-2',
      }
      return colors[cat]
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

        const events = json.map((event) => {
          event.start = this.mergeDateAndTime(event.Startdatum, event.Startuhrzeit)
          delete event.Startdatum
          delete event.Startuhrzeit

          event.end = this.mergeDateAndTime(event.Enddatum, event.Enduhrzeit)
          delete event.Enddatum
          delete event.Enduhrzeit

          // event.name = `${name}${event.Ort ? ' in ' + event.Ort : ''}`
          event.name = this.htmlDecode(event.Title ? event.Title : `${event.Untertitel}${event.Ort ? ' in ' + event.Ort : ''}`)
          delete event.Titel

          event.category = event.Kategorie
          delete event.Kategorie

          event.color = event.Farbe
          delete event.Farbe

          if (!event.color) {
            event.color = this.getColorByCategory(event.category)
          }

          return event
        })
        this.data.events = events
        this.data.earliest = events?.reduce((a, b) => { return a < b.start ? a : b.start })
        this.data.categories = events?.map(a => a.category).filter((value, index, array) => array.indexOf(value) === index)
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
