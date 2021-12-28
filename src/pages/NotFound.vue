<template lang="pug">
v-container.not-found.ma-10
  h1.mb-2 404 Seite nicht gefunden
  v-btn.mr-3(:to="{ name: 'Home' }" depressed color="primary") Startseite
  v-btn.mr-3(:to="{ name: 'Calendar' }" depressed color="primary") Kalender
  v-btn.mr-3(:to="{ name: 'Table' }" depressed color="primary") Tabelle
</template>

<script>
export default {
  name: "NotFound",
};
</script>