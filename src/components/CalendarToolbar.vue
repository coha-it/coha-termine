<template lang="pug">
v-app-bar.pt-0.coha_calendar_toolbar(flat, dense)
  v-btn.mr-4(outlined, @click="$emit('today')") Heute
  v-btn(fab, text, small, @click="$emit('prev')")
    v-icon(small) mdi-chevron-left
  v-btn(fab, text, small, @click="$emit('next')")
    v-icon(small) mdi-chevron-right

  v-menu(
    ref="menu",
    v-model="menu",
    :close-on-content-click="false",
    transition="scale-transition",
    offset-y,
    min-width="auto"
  )
    template(v-slot:activator="{ on, attrs }")
      v-toolbar-title(v-on="on", v-bind="attrs") {{ title }}
    v-date-picker(
      v-model="picker",
      show-adjacent-months,
      :active-picker.sync="activePicker",
      :min="earliest",
      :max="latest",
      @change="save",
      :type="datePickerType"
    )

  v-spacer
  v-icon(v-if="type != 'month'", @click="changeType('month')") mdi-backup-restore
  v-menu(bottom, right)
    template(v-slot:activator="{ on }")
      v-btn.ml-4(outlined, v-on="on")
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
      default: "",
    },
    type: {
      type: String,
      required: true,
    },
    typeToLabel: {
      type: Object,
      required: true,
    },
    earliest: {
      type: String,
      required: true,
    },
    latest: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      menu: false,
      activePicker: null,
      picker: null,
    };
  },

  computed: {
    datePickerType() {
      return this.type == "month" ? this.type : "date";
    },
  },

  methods: {
    changeType(type) {
      this.$emit("changeType", type);
    },
    save(date) {
      this.$refs.menu.save(date);
      this.$emit("setFocus", date);
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
