<template lang="pug">
.year_calendar
  v-date-picker(
    v-for="(e, i) in new Array(12)",
    :key="i",
    :events="yearEvents",
    :show-adjacent-months="false",
    :picker-date="getPickerDate(i + 1)",
    no-title,
    :readonly="false"
    :allowed-dates="allowedDates"
    @change="selectDate"
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
    startYear() {
      return this.$moment(this.focus ?? this.$moment()).year();
    },
  },

  methods: {
    selectDate (e) {
      this.$emit('setFocus', e)
      this.$emit('changeType', 'day')
    },
    myEventFilter: (event, date) => {
      const start = event?.start_day
      const end = event?.end_day

      switch (true) {
        case start == date:
        case end == date:
        case start <= date && end >= date:
          return 1;
        default:
          return 0;
      }
    },

    allowedDates(date) {
      return this.events.some(event => this.myEventFilter(event, date));
    },

    getPickerDate(i) {
      return `${this.startYear}-${i < 10 ? "0" + i : i}-01`;
    },

    // Return Array of Colors
    yearEvents(date) {
      return this.events
        .filter(event => this.myEventFilter(event, date))
        .map((e) => e.color);
    },
  },
};
</script>
