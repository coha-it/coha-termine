<template lang="pug">
v-card
  v-toolbar(:color='event.color' dark flat)
    v-toolbar-title(v-html='event.name')
  v-card-text
    .text-caption Details
    .text-body-1(v-html='event.details')
    v-spacer.my-4

    .text-caption Ort
    .text-body-1 {{ event.location }} {{ event.location_details }}
    v-spacer.my-4

    .text-caption Kategory
    .text-body-1 {{ event.category }}
    v-spacer.my-4

    .text-caption Datum
    .text-body-1(v-if="event.start") Startet am: {{ dateTimeString('start') }}
    .text-body-1(v-if="event.end && event.end != event.start") Ende: {{ dateTimeString('end') }}
    v-date-picker(
      v-model="range" 
      range 
      :color="event.color" 
      readonly 
      no-title 
      :min="min"
      :max="max"
      full-width
    )

    .text-caption Schlagwörter
    v-chip.mr-2(
      v-for="i in event.tags.split(',')"
      color="grey"
      :key="i"
      x-small
    ) \#{{ i }}


  v-divider
  v-card-actions
    v-btn(v-if="event.article_url" color="primary" text target="_blank" :href="event.article_url") Zum Produkt
    v-spacer
    v-btn(color="primary" text @click="$emit('close')") Schließen
</template>

<script>
export default {
  name: "Details",

  props: {
    event: {
      type: Object,
      required: true
    },
  },

  computed: {
    // locale () {
    //   const lang = this.$vuetify?.lang?.current ?? 'de'
    //   return `${lang}-${lang.toUpperCase()}`
    // },
    range: function () {
      const start = this.dateRemoveTime(this.event?.start)
      const end   = this.dateRemoveTime(this.event?.end)
      return [start, end ? end : start]
    },
    min: function () {
      return this.dateRemoveTime(this.event.start)
    },
    max: function () {
      const start = this.dateRemoveTime(this.event.start)
      const end = this.dateRemoveTime(this.event.end)

      console.log(start,end)

      if (end && end != start) {
        return end
      }
      return start
    },
    startDay () {
      return this.dateRemoveTime(this.event.start)
    },
    endDay () {
      return this.dateRemoveTime(this.event.end)
    },
  },
  
  methods: {
    dateRemoveTime: d => d?.split(' ')[0],
    dateTimeString (when) {
      return this.$moment(this.event[when]).format('LLL')
    },
  }
}
</script>

<style lang="scss" scoped>
.v-dialog > .v-card > .v-card__text {
    padding: 16px;
}

.v-date-picker-header {
  .v-btn--disabled {
    display: none;
  }
  .v-date-picker-header__value {
    pointer-events: none;
  }
}

</style>
