<template lang="pug">
v-app
  v-main
    router-view(
      v-if="events"
      :events="events"
    )
</template>

<script>
import loadevents from "@/mixins/loadevents";

export default {
  name: "App",

  mixins: [loadevents],
};
</script>
