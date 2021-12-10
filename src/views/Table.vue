<template lang="pug">
.table-view
  h1 Tabelle:
  v-data-table(
    :headers="headers"
    :items="events"
    class="elevation-1"
  )
    template(v-slot:item.calories="{ item }")
      v-chip(
        :color="getColor(item.calories)"
        dark
      ) {{ item.calories }}
</template>

<script>
export default {
  name: "Table",

  props: {
    events: {
      type: Array,
      required: true,
    },
  },
};
</script>