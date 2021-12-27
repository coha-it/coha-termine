<template lang="pug">
.home.justify-center.d-flex.align-center.ma-10
  v-btn.ma-3(
    :to="{name: 'Calendar'}"
    depressed
    color="primary"
  ) Kalender
  v-btn.ma-3(
    :to="{name: 'Table'}"
    depressed
    color="primary"
  ) Tabelle
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
