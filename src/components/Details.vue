<template lang="pug">
v-card
  v-toolbar(:color='event.color' dark flat)
    v-toolbar-title(v-html='event.name')
  v-card-text(style="max-height: 80vh; overflow-y: scroll")
    v-row(no-gutters)
      v-col(cols="12" sm="7" md="7" lg="7" xl="6")
        .text-caption Details
        .text-body-1(v-html='event.details')
        v-spacer.my-4

        //- .text-caption Ort
        //- .text-body-1 {{ event.location }} {{ event.location_details }}
        //- v-spacer.my-4

        .text-caption Kategory
        .text-body-1 {{ event.category }}
        v-spacer.my-4

        .text-caption Veranstalter
        .text-body-1 {{ event.organizer }}
        v-spacer.my-4

        .text-caption Schlagwörter
        v-chip.mr-2(
          v-for="i in event.categories"
          color="grey"
          :key="i"
          x-small
        ) \#{{ i }}

      v-col
        v-date-picker(
          v-model="range"
          :min="min"
          :max="max"
          :color="event.color" 
          no-title 
          range 
          full-width
          readonly
          show-adjacent-months
          :reactive="true"
        )

      v-col(cols="12")
        v-spacer.my-4
        .text-caption {{ hasDifferentEndDate ? 'Zeitraum' : 'Datum' }}
        .text-body-1
          template(v-if="event.start")
            span.black--text {{ dateTimeString('start') }}
          template(v-if="hasDifferentEndDate")
            | &nbsp;bis&nbsp;
            span.black--text {{ dateTimeString('end') }}

  v-divider
  v-card-actions
    v-btn(color="primary" text @click="$emit('close')") Schließen
    v-spacer
    v-btn(v-if="event.article_url" color="primary" text target="_blank" :href="event.article_url") Zum Produkt
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

  // data () {
  //   return {
      
  //   }
  // },

  computed: {
    // locale () {
    //   const lang = this.$vuetify?.lang?.current ?? 'de'
    //   return `${lang}-${lang.toUpperCase()}`
    // },
    range: function () {
      const start = this.dateRemoveTime(this.event?.start)
      const end   = this.dateRemoveTime(this.event?.end)
      const range = [start, end ? end : start]
      return range
    },
    min: function () {
      return this.dateRemoveTime(this.event.start)
    },
    max: function () {
      const start = this.dateRemoveTime(this.event.start)
      const end = this.dateRemoveTime(this.event.end)

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
    hasDifferentEndDate () {
      const start = this.event.start
      const end = this.event.end
      return end && end != start
    }
  },

  mounted: function() {
    console.log('mounted')
  },
  
  methods: {
    dateRemoveTime: d => d?.split(' ')[0],
    dateTimeString (when) {
      const date = this.$moment(this.event[when])
      const time = date.format('HH:mm:ss')

      return time === '00:00:00' ? date.format('LL') : date.format('LLL')
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
