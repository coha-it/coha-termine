<template lang="pug">
v-container.pa-0(fluid)
  CalendarComponent(:data="data")
</template>

<script>
import CalendarComponent from '@/components/CalendarComponent.vue'
export default {

  name: 'CalendarPage',

  props: {
    data: {
      type: Object,
      required: true,
    }
  },

  components: {
    CalendarComponent
  },
}
</script>
