<template lang="pug">
.home
  Calendar(msg="Welcome to Your Vue.js App")
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Home',
  components: {
    Calendar
  }
}
</script>
