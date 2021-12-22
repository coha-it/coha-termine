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
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Ort',
          align: 'start',
          sortable: false,
          value: 'ort',
        },
        'start',
        'end',
        'details',
        'color',
        'article_url',
      ],
    };
  },
};
</script>