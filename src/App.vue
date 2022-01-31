<template lang="pug">
component(:is="layout")
  router-view
</template>

<script>
export default {
  name: "App",

  computed: {
    layout () {
      return (this.$route?.meta?.layout || 'default') + '-layout'
    },
  },
};
</script>
