<template lang="pug">
.calendar-component
  Toolbar(
    :earliest="data.earliest",
    :latest="data.latest",
    :title="titleDe",
    :type="type",
    :typeToLabel="typeToLabel",
    @next="next",
    @prev="prev",
    @today="setToday",
    @changeType="changeType",
    @setFocus="setFocus"
  )

  .coha_calendar_wrapper.mt-2.year(v-if="typeIsYear" anyevents)
    Year(
      v-if="focus"
      :focus="focus"
      :events="events"
      @setFocus="setFocus"
      @changeType="changeType"
    )

  .coha_calendar_wrapper.mt-2(v-show="!typeIsYear" :anyevents="anyEvents")
    v-calendar(
      ref="calendar",
      v-model="focus",
      color="primary",
      locale="de",
      :events="events",
      :event-color="getEventColor",
      :event-margin-bottom="3",
      :now="today",
      :type="getType()",
      :weekdays="[1, 2, 3, 4, 5, 6, 0]",
      @click:event="showEvent",
      @click:more="viewDay",
      @click:date="viewDay",
      @change="updateRange",
      :categories="categories"
    )
      template(v-slot:event="{ event }")
        .pl-1 {{ event.name }}
    v-menu(
      v-model="selectedOpen",
      :close-on-content-click="false",
      :activator="selectedElement",
      offset-x
    )
      Details(
        v-if="selectedOpen"
        :event="selectedEvent",
        @close="selectedOpen = false",
        color="grey lighten-4",
        min-width="350px",
        flat
      )
</template>

<script>
import Toolbar from "@/components/CalendarToolbar.vue";
import Details from "@/components/Details.vue";
import Year from "@/components/Year.vue";

export default {
  name: "Calendar",

  components: {
    Toolbar,
    Details,
    Year,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    anyEvents: false,
    focus: null,
    // today: new Date().toISOString().substr(0, 10),
    // tomorrow: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().substr(0, 10),
    type: "month", // TODO Change to month!
    typeToLabel: {
      month: "Monat",
      week: "Woche",
      day: "Tage",
      "4day": "4 Tage",
      category: "Kategorie",
      year: "Jahr"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  computed: {
    today() {
      return this.dateString();
    },
    events() {
      return this.data?.events;
    },
    categories() {
      return this.data?.categories;
    },

    titleDe() {
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

      const startDay = start.day;
      const endDay = end.day;

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`
        case "week":
        case "4day":
          return `${
            suffixMonth ? startDay + "." : startDay
          } ${suffixMonth} ${suffixYear} - ${endDay}. ${startMonth} ${startYear}`
        case "day":
        case "category":
          return `${startDay}. ${startMonth} ${startYear}`
        case "year":
          return `${startYear}`
      }
      return "";
    },

    titleEn() {
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
        case "category":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      if(this.$refs.calendar) {
        return this.$refs.calendar.getFormatter({
          timeZone: "UTC",
          month: "long",
        })
      } else {
        return (e) => e
      }
    },

    typeIsYear() {
      return this.type == 'year'
    },

    prod() {
      return process?.env?.NODE_ENV === "production";
    },
    dev() {
      return process?.env?.NODE_ENV === "development";
    },
  },

  mounted() {
    this.$refs.calendar.checkChange();
    this.focusEarliestOrToday();
  },

  methods: {
    getType() {
      if(this.typeIsYear) {
        return 'month'
      } else {
        return this.type
      }
    },
    changeType(type) {
      this.type = type;
    },
    dateString(date) {
      return this.$moment(date).format('YYYY-MM-DD')
    },
    setFocus(date) {
      this.focus = this.dateString(date);
    },
    focusEarliestOrToday() {
      const earliest = this.data.earliest;
      const today = this.today;
      this.focus = earliest > today ? earliest : today;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      const color = event?.color;
      return color ? color : "green";
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      if (this.typeIsYear) {
        this.$refs.calendar.prev(12);
      } else {
        this.$refs.calendar.prev();
      }
    },
    next() {
      if (this.typeIsYear) {
        this.$refs.calendar.next(12);
      } else {
        this.$refs.calendar.next();
      }
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

      const range_start = start.date;
      const range_end = end.date;

      this.anyEvents = this.events.some((e) => {
        const event_start = e.start?.split("T")[0];
        const event_end = e.end?.split("T")[0];

        switch (true) {
          case event_start == range_start:
          case event_end == range_end:
          case event_end >= range_start && event_start <= range_start:
          case event_end <= range_end && event_start >= range_start:
          case event_start >= range_start && event_start <= range_end:
            return true;

          default:
            return false;
        }
      })
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
  },
};
</script>
