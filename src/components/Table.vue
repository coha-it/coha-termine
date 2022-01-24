<template lang="pug">
.table-component
  h1 Tabelle:
  v-text-field(
    v-model="search",
    append-icon="mdi-magnify",
    label="Suche",
    placeholder="Suchbegriff eingeben...",
    single-line
  )

  v-select.d-flex.d-sm-none(
    label="Gruppieren nach:",
    v-model="groupBy",
    :items="getGroupable",
    item-text="text",
    item-value="value"
  )

  v-data-table.elevation-1(
    :headers="headers",
    :items="events",
    :search="search",
    multi-sort,
    show-group-by,
    :items-per-page="-1",
    :sort-by="['start', 'fat']",
    :custom-filter="customFilter",
    :group-by="groupBy",
    @update:group-by="updateGroupBy"
    :item-class="getItemClass"
  )
    // Header Slots
    template(v-slot:header.start="{ header }")
      | Beginnt am
    template(v-slot:header.end="{ header }")
      | Endet am

    // Body/Item Slots
    template(v-slot:item.category="{ item }")
      v-chip(:color="item.color", small) {{ item.category }}

    template(v-slot:item.details="{ item }")
      .coha_details_text {{ item.details }}

    template(v-slot:item.start="{ item }")
      | {{ formatDate(item.start) }} {{ formatTime(item.start) }}
      .days_left(
        v-if="daysLeft(item.start)"
        :daysleft="daysLeft(item.start)"
        :class="{ 'persistent': daysLeft(item.start) < 20}"
        :style="{ backgroundColor: 'hsl(120deg ' + (100 - daysLeft(item.start) + 10) + '% 16% / 60%)' }"
      ) {{ daysLeft(item.start) }} Tage bis zum Start

    template(v-slot:item.end="{ item }")
      | {{ formatDate(item.end) }} {{ formatTime(item.end) }}
      .expiring_status(:class="getExpiringStatus(item)")

    //- template(v-slot:item.location="{ item }")
    //-   | {{ item.location }}
    //-   .location_details(v-if="item.location_details") ({{ item.location_details }})

    template(v-slot:item.more="{ item }")
      .my-2
        //- v-btn.mr-2(
        //-   v-if="item.details"
        //-   small
        //-   depressed
        //- ) Details 
        TableDialog(v-if="item.details", :item="item")
        v-spacer.my-1.d-none.d-sm-flex
        v-btn(
          v-if="item.article_url",
          :href="item.article_url",
          target="_blank",
          small,
          depressed
        ) Zum Produkt
</template>

<script>
import TableDialog from "@/components/TableDialog";

export default {
  name: "Table",

  components: {
    TableDialog,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    events() {
      return this.data?.events;
    },
    getGroupable() {
      return this.headers
        .filter((a) => a.groupable !== false)
        .map((e) => ({ value: e.value, text: e.text }));
    },
  },

  methods: {

    getItemClass(item) {
      return this.getExpiringStatus(item)
    },

    getExpiringStatus (item) {
      let now = this.$moment()
      let start = this.$moment(item.start)
      let end = this.$moment(item.end)

      const hoursBetween = this.$moment.duration(now.diff(start)).asHours()

      switch(true) {
        case start > now:
          return 'pending'

        case hoursBetween > 0 && hoursBetween < 24  && (!item.end || end >= now):
          return 'running'

        case hoursBetween > 24 * 14:
          return 'hidden'

        default:
          return 'expired'
      }
    },
    daysLeft (date) {
      const today = this.$moment()
      const next = this.$moment(date)
      const diffDays = next.diff(today, 'days')
      if (diffDays > 0 && diffDays < 100) {
        return diffDays
      }
    },
    updateGroupBy(e) {
      this.groupBy = e;
    },

    formatTime (d) {
      const time = this.$moment(d).format('HH:mm')
      
      if(time !== '00:00') {
        return time
      }
    },

    formatDate(d) {
      if(d) {
        return this.$moment(d).format('l')
      }
    },

    customFilter: (items, search, filter) => {
      // "items" is some sort of array. but dont use it
      // "search" is the whole search-string
      // "filter" is the object

      // console.log(items, filter)
      // return items?.toLowerCase().includes(search.toLowerCase())

      return Object.values(filter)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
    },
  },

  data() {
    return {
      search: "",
      groupBy: null,
      headers: [
        {
          text: "Titel",
          value: "name",
          groupable: false,
          divider: true,
        },
        {
          text: "Ort",
          value: "location",
          divider: true,
        },
        {
          text: "Startdatum",
          value: "start",
          groupable: false,
          divider: false,
        },
        {
          text: "Enddatum",
          value: "end",
          groupable: false,
          divider: true,
        },
        {
          text: "Kategorie",
          value: "category",
          divider: true,
        },
        {
          text: "Veranstalter",
          value: "organizer",
          divider: true,
        },
        {
          text: "Weiteres",
          value: "more",
          groupable: false,
          sortable: false,
        },
        // {
        //   text: "Details",
        //   value: "details",
        //   groupable: false,
        //   divider: true,
        // },
        // {
        //   text: "Weiteres",
        //   value: "article_url",
        //   groupable: false,
        //   divider: true,
        // },
      ],
    };
  },
};
</script>
