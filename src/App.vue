<template lang="pug">
v-app
  Main
    component(:is="layout")
      router-view
  Footer
</template>

<script>
export default {
  name: "App",
  computed: {
    layout () {
      return (this.$route?.meta?.layout || 'default') + '-layout'
    },
  }
};
</script>
