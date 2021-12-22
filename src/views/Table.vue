<template lang="pug">
v-container.table-view
  h1 Tabelle:
  v-data-table(
    :headers="headers"
    :items="events"
    class="elevation-1"
  )
    //- template(v-slot:item.calories="{ item }")
    //-   v-chip(
    //-     :color="getColor(item.calories)"
    //-     dark
    //-   ) {{ item.calories }}
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
      return this.data?.events
    }
  },

  data () {
    return {
      headers: [
        {
          text: 'Titel',
          value: 'name',
        },
        {
          text: 'Ort',
          value: 'ort',
        },
        {
          text: 'Startdatum',
          value: 'start',
        },
        {
          text: 'Enddatum',
          value: 'end',
        },
        {
          text: 'Schlagwörter',
          value: 'tags',
        },
        {
          text: 'Kategorie',
          value: 'category',
        },
        {
          text: 'Veranstalter',
          value: 'organizer',
        },
        {
          text: 'Details',
          value: 'details',
        },
        {
          text: 'Artikel-URL',
          value: 'article_url',
        },
      ],
    };
  },
};
</script>