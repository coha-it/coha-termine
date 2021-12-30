<template lang="pug">
.year_calendar
  v-date-picker(
    v-for="(e, i) in new Array(12)"
    :key="i"
    :events="yearEvents"
    :show-adjacent-months="false"
    :picker-date="getPickerDate(i+1)"
    no-title
    readonly
    :allowed-dates="allowedDates"
  )
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
  },

  computed: {
    startYear () {
      return this.$moment(this.focus ?? this.$moment()).year()
    },
  },

  // mounted () {
  //   this.$emit('init')
  // },

  methods: {

    allowedDates (date) {
      console.log(date)
      // return parseInt(date.split('-')[2], 10) % 2 === 0
      return this.events.some((event) => {
        switch (true) {
          case event.start == date:
          case event.end == date:
          case event.start <= date && event.end >= date:
            return 1        
          default:
            return 0
        }
      })
    },

    getPickerDate(i) {
      return `${this.startYear}-${i < 10 ? '0'+i : i}-01`
    },

    // Return Array of Colors
    yearEvents (date) {
      return this.events.filter((event) => {
        switch (true) {
          case event.start == date:
          case event.end == date:
          case event.start <= date && event.end >= date:
            return true        
          default:
            return false
        }
      }).map(e => e.color)
    },

  },
}
</script>
