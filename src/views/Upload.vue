<template lang="pug">
.file-upload
  v-form(v-model='valid' @submit.prevent="submit")
    v-container
      v-row
        v-col
          v-alert(
            v-if="alert.active"
            :type="alert.type"
          ) {{ alert.text }}
      template(v-hide="alert && alert.active && alert.type === 'success'")
        v-row
          v-col
            br
            v-spacer
            h1 Datei hochladen
        v-spacer
        v-row
          v-col(cols='12' xs='12' sm='8' md='6')
            v-text-field(
              v-model='pin'
              :rules='pinRules'
              label='PIN / Passwort'
              required
              type="password"
              outlined
              autofocus
            )
        v-spacer

        v-row
          v-col(cols='12' xs='12' sm='8' md='6')
            | Event-Datei auswählen & hochladen
            br
            br
            v-file-input(
              v-model="file"
              accept=".xml"
              outlined
              label="XML-Datei auswählen"
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
    pinRules: [(v) => !!v || "PIN ist erforderlich"],
    alert: {
      active: false,
      type: null,
      text: null,
    },
  }),

  methods: {
    submit() {
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('pin', this.pin);
      this.alert.active = false;

      axios({
        method: "POST",
        url: process?.env?.VUE_APP_API + process?.env?.VUE_APP_UPLOAD_URL,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => { /* response */
        const alert = this.alert
        alert.active = true
        alert.type = 'success'
        alert.text = 'Datei erfolgreich hochgeladen'
      }).catch(() => { /* error */
        const alert = this.alert
        alert.active = true
        alert.type = 'error'
        alert.text = 'Fehler. XML-Datei fehlerhaft oder falscher PIN / falsches Passwort'
      }).then(() => { /* always */
        this.pin = ''
      })
    },
  },
};
</script>
