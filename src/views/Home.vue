<template lang="pug">
.home
  router-link(:to="{name: 'Calendar'}") Kalender
  router-link(:to="{name: 'Table'}") Tabelle
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
