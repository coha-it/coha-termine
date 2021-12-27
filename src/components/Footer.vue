<template lang="pug">
v-container
  v-footer(v-if="dev" bottom color="transparent")
    router-link.mr-4(:to="{ name: 'Home' }") home
    router-link.mr-4(:to="{ name: 'Upload' }") upload
    router-link.mr-4(:to="{ name: 'Calendar' }") kalender
    router-link.mr-4(:to="{ name: 'Table' }") table
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    dev () {
      return process?.env?.NODE_ENV === 'development'
    }
  }
}
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  opacity: .5;
  pointer-events: none;
}
</style>
