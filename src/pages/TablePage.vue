<template lang="pug">
v-container.table-view
  TableComponent(:data="data")
</template>

<script>
import TableComponent from "@/components/TableComponent";

export default {
  name: "TablePage",

  components: {
    TableComponent,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>