<template lang="pug">
v-dialog(v-model="dialog", width="500")
  template(v-slot:activator="{ on, attrs }")
    v-btn.mr-2(v-bind="attrs" v-on="on" small depressed)
      | Details
  v-card
    v-card-title.text-h5.grey.lighten-2 {{ item.name }}
    v-card-text
      | {{ item.details }}
      v-spacer
      v-btn(
        v-if="item.article_url"
        color="primary"
        target="_blank"
        :href="item.article_url"
        small
      ) Zum Produkt
      v-spacer
      //- div {{ item.tags.split(',') }}
      v-chip(
        v-for="i in item.tags.split(',')"
        color="grey"
        small
      ) {{ i }}
    v-divider
    v-card-actions
      v-spacer
      v-btn(color="primary" text @click="dialog = false") Schließen
</template>

<script>
export default {
  name: 'TableDialog',
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
