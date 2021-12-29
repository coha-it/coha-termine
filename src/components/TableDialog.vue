<template lang="pug">
v-dialog(v-model="dialog" width="650" scrollable)
  template(v-slot:activator="{ on, attrs }")
    v-btn.mr-2(v-bind="attrs" v-on="on" small depressed)
      | Details
  Details(:event="item" @close="dialog = false" scrollable)
</template>

<script>
import Details from '@/components/Details.vue'

export default {
  name: 'TableDialog',

  components: {
    Details,
  },

  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
