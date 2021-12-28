<template lang="pug">
v-container.pa-0(fluid v-if="events")
  v-app-bar.pt-0.coha_calendar_toolbar(flat dense)
    v-btn.mr-4(
      outlined
      @click='setToday'
    ) Heute 
    v-btn(fab text small @click='prev')
      v-icon(small) mdi-chevron-left
    v-btn(fab text small @click='next')
      v-icon(small) mdi-chevron-right
    v-toolbar-title {{ title }}
    v-spacer
    v-icon(v-if="type != 'month'" @click="type = 'month'") mdi-backup-restore
    v-menu(bottom right)
      template(v-slot:activator='{ on }')
        v-btn(outlined v-on='on')
          span {{ typeToLabel[type] }}
          v-icon(right) mdi-menu-down
      v-list
        v-list-item(@click="type = 'month'")
          v-list-item-title Monat
        v-list-item(@click="type = 'day'")
          v-list-item-title Tag
        v-list-item(@click="type = 'week'")
          v-list-item-title Woche
        v-list-item(@click="type = '4day'")
          v-list-item-title 4 Tage
        v-list-item(@click="type = 'category'")
          v-list-item-title Kategorie-Ansicht
  .coha_calendar_wrapper.mt-2
    v-calendar(
      ref='calendar'
      v-model='focus'
      color='primary'
      locale='de'
      :events='events'
      :event-color='getEventColor'
      :event-margin-bottom='3'
      :now='today'
      :type='type'
      :weekdays='[1, 2, 3, 4, 5, 6, 0]'
      @click:event='showEvent'
      @click:more='viewDay'
      @click:date='viewDay'
      @change='updateRange'
      :categories='categories'
      :anyevents="anyEvents"
    )
      template(v-slot:event="{ event }")
        .pl-1 {{ event.name }}
    v-menu(
      v-model='selectedOpen'
      :close-on-content-click='false'
      :activator='selectedElement'
      offset-x
    )
      v-card(color='grey lighten-4' min-width='350px' flat)
        v-toolbar(:color='selectedEvent.color' dark)
          v-toolbar-title(v-html='selectedEvent.name')
          v-spacer
          v-btn(icon target='_blank' :href="selectedEvent.article_url")
            v-icon mdi-calendar
        v-card-text
          span(v-html='selectedEvent.details')
        v-card-actions
          v-btn(text color='secondary' @click='selectedOpen = false') Schlie&szlig;en
</template>

<script>
export default {

  name: 'Calendar',

  props: {
    data: {
      type: Object,
      required: true,
    }
  },

  data: () => ({
    anyEvents: false,
    focus: null,
    today: new Date().toISOString().substr(0, 10),
    // tomorrow: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Monat",
      week: "Woche",
      day: "Tage",
      "4day": "4 Tage",
      "category": "Kategorie",
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  computed: {
    events () {
      return this.data?.events
    },
    categories () {
      return this.data?.categories
    },
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },

    prod () {
      return process?.env?.NODE_ENV === 'production'
    },
    dev () {
      return process?.env?.NODE_ENV === 'development'
    },
  },
  mounted() {
    this.$refs.calendar.checkChange()

    this.focusEarliestOrToday()
  },
  methods: {
    focusEarliestOrToday () {
      const earliest = this.data.earliest
      const today = this.today
      this.focus = earliest > today ? earliest : today
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      const color = event?.color
      return color ? color : 'green'
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;

      this.anyEvents = this.events.some(event => 
        (event.start >= start.date && event.start <= end.date) || 
        (event.end >= start.date && event.end <= end.date)
      )
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
  },
};
</script>
