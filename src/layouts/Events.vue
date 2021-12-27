<template lang="pug">
router-view(v-if="loaded" :data="data")
</template>

<script>
import loadevents from "@/mixins/loadevents";

export default {
  mixins: [loadevents],
  computed: {
    loaded () {
      return this.data?.events?.length > 0
    }
  },
}
</script>