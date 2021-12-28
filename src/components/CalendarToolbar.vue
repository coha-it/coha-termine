<template lang="pug">
v-app-bar.pt-0.coha_calendar_toolbar(flat dense)
  v-btn.mr-4(
    outlined
    @click="$emit('today')"
  ) Heute 
  v-btn(fab text small @click="$emit('prev')")
    v-icon(small) mdi-chevron-left
  v-btn(fab text small @click="$emit('next')")
    v-icon(small) mdi-chevron-right
  v-toolbar-title {{ title }}
  v-spacer
  v-icon(v-if="type != 'month'" @click="changeType('month')") mdi-backup-restore
  v-menu(bottom right)
    template(v-slot:activator='{ on }')
      v-btn(outlined v-on='on')
        span {{ typeToLabel[type] }}
        v-icon(right) mdi-menu-down
    v-list
      v-list-item(@click="changeType('month')")
        v-list-item-title Monat
      v-list-item(@click="changeType('day')")
        v-list-item-title Tag
      v-list-item(@click="changeType('week')")
        v-list-item-title Woche
      v-list-item(@click="changeType('4day')")
        v-list-item-title 4 Tage
      v-list-item(@click="changeType('category')")
        v-list-item-title Kategorie-Ansicht
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: true,
    },
    typeToLabel: {
      type: Object,
      required: true,
    }
  },

  methods: {
    changeType (type) {
      this.$emit('changeType', type)
    }
  },
}
</script>
