<template lang="pug">
v-container.pa-0(fluid)
  Calendar(:data="data")
</template>

<script>
import Calendar from '@/components/Calendar.vue'
export default {

  name: 'CalendarPage',

  props: {
    data: {
      type: Object,
      required: true,
    }
  },

  components: {
    Calendar,
  },
}
</script>
