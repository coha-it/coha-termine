import axios from "axios";

export default {
  name: "LoadEvents",

  data: function () {
    return {
      data: {
        events: [],
        earliest: null,
        latest: null,
        loaded: false,
      }
    };
  },

  computed: {
    production: () => process.env.NODE_ENV === 'production',
    prod: function () { return this.production },
    development: function () { return !this.production },
    dev: function () { return this.development },
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
      return this.$moment(`${date} ${time}`, 'DD.MM.YYYY HH:mm:ss').format("YYYY-MM-DD[T]HH:mm:ss")
    },

    htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html")
      return doc?.documentElement?.textContent ?? input
    },

    getColorByCategory (cat) {
      const colors = {
        // "Offenes Programm"      : '#FED118',
        "Ausbildungsstart"      : 'blue lighten-4',
        "Offenes Programm"      : 'blue lighten-1',
        "Botschaftertreffen"    : 'amber lighten-3',
        // "Seminar"               : '',
        "Workshop"              : 'blue-grey lighten-1',
        "Impulsabend"           : 'orange darken-2',
        "Keynote"               : 'yellow darken-1',
        "Leitbild-Abend"        : 'blue-grey lighten-2',
        "Unternehmerwanderung"  : 'brown lighten-2',
        "Leitbild Abend"        : 'brown darken-1',
        // DNF / Das Neue Führen
        "Das Neue Führen"  : 'rgb(242, 192, 40)',
        "DNF Tag"  : 'rgb(242, 192, 40)',
        "DNF Intensivseminar"  : 'rgb(242, 192, 40)',
      }
      return colors[cat]
    },

    formatKeys: obj => {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase().replaceAll(/[\s/]/g,'_')] = obj[key]
        return acc
      }, {})
    },

    dateTimeToDayString: str => str?.split('T')[0],

    dateToGermanNameString (str) {
      return this.$moment(str).format('LLLL')
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

          // Rename Key function
          event.rename_key = function (o, n) {
            const tmp = event[o]
            if(tmp) {
              delete event[o]
              event[n] = tmp
            }
          }

          // Lowercase all Keys
          event = this.formatKeys(event)

          // Renaming
          event.rename_key('untertitel', 'subtitle')
          event.rename_key('betreff', 'name')
          event.rename_key('kategorien', 'categories')
          event.rename_key('farbe', 'color')
          event.rename_key('ort', 'location')
          event.rename_key('veranstalter', 'organizer')
          event.rename_key('erforderliche_teilnehmer', 'organizer')
          event.rename_key('artikel_link', 'article_url')
          event.rename_key('beschreibung', 'details')
          
          // Edit Categories
          event.categories = event.categories.split(';')
          event.category = event.categories[0]

          // Change Dates
          event.start = this.mergeDateAndTime(event['beginnt_am'], event['beginnt_um'])
          event.start_day = this.dateTimeToDayString(event.start)
          event.start_german = this.dateToGermanNameString(event.start)
          // event.start_weekday = this.weekday(event.start)
          delete event['beginnt_am']
          delete event['beginnt_um']

          event.end = this.mergeDateAndTime(event['endet_am'], event['endet_um'])
          event.end_day = this.dateTimeToDayString(event.end)
          event.end_german = this.dateToGermanNameString(event.end)
          // event.end_weekday = this.weekday(event.end)
          delete event['endet_am']
          delete event['endet_um']


          // event.name = `${name}${event.Ort ? ' in ' + event.Ort : ''}`
          event.name = event.name ? event.name : `${event.untertitel}${event.ort ? ' in ' + event.ort : ''}`

          // Color
          event.color = event.color ? event.color : this.getColorByCategory(event.category)

          // Split organizer
          // event.organizer = event.organizer?.split(';')
          event.organizer = event.organizer.replaceAll(';', ' und ')

          // All strings to html decode
          Object.keys(event).map((key) => {
            if(typeof event[key] === 'string') {
              event[key] = this.htmlDecode(event[key])
            }
          });

          // Delete Function
          delete event.rename_key

          // Return event
          return event
        }).sort((a, b) => new Date(a.start) - new Date(b.start))

        this.data.events = events

        // Get Earliest
        // this.data.earliest = events?.reduce((a, b) => { return a < b.start ? a : b.start })
        // this.data.earliest = this.data.events?.find(Boolean)?.start
        // this.data.earliest = this.data.events.find(a => new Date(a.start) > new Date() )?.start
        this.data.earliest = this.data.events[0].start

        // Get Latest
        // this.data.latest = events?.reduce((a, b) => { return a > b.start ? a : b.start })
        this.data.latest = this.data.events[this.data.events?.length-1]?.start

        this.data.categories = events?.map(a => a.category).filter((value, index, array) => array.indexOf(value) === index)
        this.data.loaded = this.data.events.length > 0

        if(this.dev) {
          console.log(this.data)
        }
      },
      (error) => {
        console.error(error);
      }
    );
  },
};
