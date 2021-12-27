<template lang="pug">
v-container.table-view
  h1 Tabelle:

  v-text-field(
    v-model="search",
    append-icon="mdi-magnify",
    label="Search",
    single-line,
    hide-details
  )

  v-data-table.elevation-1(
    :headers="headers"
    :items="events"
    :search="search"
    multi-sort
    show-group-by
    :items-per-page="-1"
  )

    // Header Slots
    template(v-slot:header.start="{ header }")
      | Beginnt am
    template(v-slot:header.end="{ header }")
      | Endet am

    // Body/Item Slots
    template(v-slot:item.category="{ item }")
      v-chip(:class="item.color") {{ item.category }}
      

    template(v-slot:item.details="{ item }")
      .coha_details_text {{ item.details }}

    template(v-slot:item.start="{ item }")
      | {{ formatDate(item.start) }}

    template(v-slot:item.end="{ item }")
      | {{ formatDate(item.end) }}
</template>

<script>
export default {
  name: "Table",

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    events() {
      return this.data?.events;
    },
  },

  methods: {
    // customFilter(value, search, item) {
    //   console.log(value, search, item)
    //   return (
    //     value != null &&
    //     search != null &&
    //     typeof value === "string" &&
    //     value.toString().toLocaleUpperCase().indexOf(search) !== -1
    //   );
    // },

    formatDate (d) {
      if(d) {
        return new Date(d).toLocaleDateString('de-DE')
      }
      return d
    }
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Titel",
          value: "name",
          groupable: false,
          divider: true,
        },
        {
          text: "Ort",
          value: "ort",
          divider: true,
        },
        {
          text: "Startdatum",
          value: "start",
          groupable: false,
          divider: false,
        },
        {
          text: "Enddatum",
          value: "end",
          groupable: false,
          divider: true,
        },
        {
          text: "Schlagwörter",
          value: "tags",
          divider: true,
        },
        {
          text: "Kategorie",
          value: "category",
          divider: true,
        },
        {
          text: "Veranstalter",
          value: "organizer",
          divider: true,
        },
        {
          text: "Details",
          value: "details",
          groupable: false,
          divider: true,
        },
        {
          text: "Weiteres",
          value: "article_url",
          groupable: false,
          divider: true,
        },
      ],
    };
  },
};
</script>