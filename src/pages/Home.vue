<template lang="pug">
.home
  Calendar(:data="data")
  v-container
    Table(:data="data")
</template>

<script>
import Table from '@/components/Table.vue'
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Home',

  components: {
    Table,
    Calendar,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
