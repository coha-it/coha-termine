<template lang="pug">
v-app
  Main
    router-view(v-if="loaded" :data="data")
  Footer
</template>

<script>
import loadevents from "@/mixins/loadevents"
import Footer from '@/components/Footer'

export default {
  mixins: [loadevents],
  components: {
    Footer
  },
  computed: {
    loaded () {
      return this.data?.events?.length > 0
    }
  },
}
</script>