<template lang="pug">
.home
  CalendarComponent(:data="data")
  v-container
    TableComponent(:data="data")
</template>

<script>
import TableComponent from '@/components/TableComponent.vue'
import CalendarComponent from '@/components/CalendarComponent.vue'

export default {
  name: 'Home',

  components: {
    TableComponent,
    CalendarComponent,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
