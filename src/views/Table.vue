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
    :headers="headers",
    :items="events",
    :search="search",
    multi-sort,
    show-group-by,
    :items-per-page="-1",
    :sort-by="['start', 'fat']",
    :custom-filter="customFilter"
  )
    // Header Slots
    template(v-slot:header.start="{ header }")
      | Beginnt am
    template(v-slot:header.end="{ header }")
      | Endet am

    // Body/Item Slots
    template(v-slot:item.category="{ item }")
      v-chip(:color="item.color") {{ item.category }}

    template(v-slot:item.details="{ item }")
      .coha_details_text {{ item.details }}

    template(v-slot:item.start="{ item }")
      | {{ formatDate(item.start) }}

    template(v-slot:item.end="{ item }")
      | {{ formatDate(item.end) }}

    template(v-slot:item.more="{ item }")
      .my-2
        //- v-btn.mr-2(
        //-   v-if="item.details"
        //-   small
        //-   depressed
        //- ) Details 
        TableDialog(
          v-if="item.details"
          :item="item"
        )

        v-btn.mt-2(
          v-if="item.article_url"
          color="primary"
          :href="item.article_url"
          target="_blank"
          small
          depressed
        ) Zum Produkt
</template>

<script>
import TableDialog from '@/components/TableDialog'

export default {
  name: "Table",

  components: {
    TableDialog
  },

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
    formatDate(d) {
      if (d) {
        return new Date(d).toLocaleDateString("de-DE");
      }
      return d;
    },

    customFilter: (items, search, filter) => {
      // "items" is some sort of array. but dont use it
      // "search" is the whole search-string
      // "filter" is the object

      // console.log(items, filter)
      // return items?.toLowerCase().includes(search.toLowerCase())

      return Object.values(filter)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    },
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
        // {
        //   text: "Schlagwörter",
        //   value: "tags",
        //   divider: true,
        // },
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
          text: 'Weiteres',
          value: 'more',
          groupable: true,
        }
        // {
        //   text: "Details",
        //   value: "details",
        //   groupable: false,
        //   divider: true,
        // },
        // {
        //   text: "Weiteres",
        //   value: "article_url",
        //   groupable: false,
        //   divider: true,
        // },
      ],
    };
  },
};
</script>