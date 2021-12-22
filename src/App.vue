<template lang="pug">
v-app
  Main
    router-view(v-if="loaded" :data="data")
  v-footer(v-if="dev" bottom color="transparent")
    router-link.mr-4(:to="{ name: 'Upload' }") upload
    router-link.mr-4(:to="{ name: 'Calendar' }") kalender
    router-link.mr-4(:to="{ name: 'Table' }") table
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  opacity: .5;
  pointer-events: none;
}
</style>

<script>
import loadevents from "@/mixins/loadevents";

export default {
  name: "App",
  mixins: [loadevents],
  computed: {
    loaded () {
      return this.data?.events?.length > 0
    },
    dev () {
      return process?.env?.NODE_ENV === 'development'
    }
  }
};
</script>
