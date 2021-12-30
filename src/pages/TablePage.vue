<template lang="pug">
v-container.table-view
  Table(:data="data")
</template>

<script>
import Table from "@/components/Table";

export default {
  name: "TablePage",

  components: {
    Table,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>