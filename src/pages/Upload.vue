<template lang="pug">
.file-upload

  v-snackbar(
    v-model="snackbar.active"
    v-if="snackbar.active && snackbar.text"
    :color="snackbar.type"
    vertical
  )
    | {{ snackbar.text }}
    template(v-slot:action="{ attrs }")
      v-btn(
        text
        v-bind="attrs"
        @click="resetMessage"
      ) Schließen

  v-form(v-model='valid' @submit.prevent="submit")
    v-container
      v-row
        v-col
          h1 Datei hochladen
      v-spacer
      v-row
        v-col(cols='12' xs='12' sm='8' md='6')
          v-text-field(
            v-model='pin'
            label='PIN / Passwort'
            required
            type="password"
            outlined
            autofocus
          )
      v-spacer

      v-row
        v-col
          | Dateityp auswählen
          v-radio-group(v-model="type")
            v-radio(
              v-for="type in types"
              :key="type"
              :label="`${typeLabel(type)}`"
              :value="type"
            )

      template(v-if="type")
        v-row
          v-col(cols='12' xs='12' sm='8' md='6')
            | Event-Datei auswählen & hochladen
            br
            br
            v-file-input(
              v-model="file"
              :accept="`.${type}`"
              outlined
              :label="`${typeLabel()} Datei auswählen`"
              show-size
              prepend-icon="mdi-file-document-outline"
            )
            v-spacer
        v-row
          v-col
            v-btn(
              color="primary"
              depressed
              :disabled="!valid || pin.length < 3 || !file"
              type="submit"
            ) Hochladen
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",

  data: () => ({
    valid: true,
    file: null,
    pin: "",
    snackbar: {}
  }),

  computed: {
    type: {
      set (type) {
        this.$router.push({ params: { type }})
      },
      get () {
        return this.$route.params.type
      }
    },
    types: () => ['xml', 'csv']
  },

  mounted () {
    this.resetMessage()
  },

  methods: {

    typeLabel (label = this.type) {
      return label?.toUpperCase()
    },

    resetMessage () {
      this.snackbar = {
        active: false,
        text: null,
        type: null,
      }
    },

    successMessage () {
      const msg = this.snackbar
      msg.active = true
      msg.type = 'success'
      msg.text = "Datei erfolgreich hochgeladen"
    },

    errorMessage () {
      const msg = this.snackbar
      msg.active = true
      msg.type = 'error'
      msg.text = "Fehler. XML-Datei fehlerhaft oder falscher PIN / falsches Passwort"
    },

    submit() {
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('type', this.type);
      formData.append('pin', this.pin);
      this.resetMessage()

      axios({
        method: "POST",
        url: process?.env?.VUE_APP_API + process?.env?.VUE_APP_UPLOAD_URL,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          /* response */
          this.successMessage()
        })
        .catch(() => {
          /* error */
          this.errorMessage()
        })
        .then(() => {
          /* always */
          this.pin = "";
        });
    },
  },
};
</script>
