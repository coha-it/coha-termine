<template lang="pug">
.file-upload
  v-form(v-model='valid')
    v-container
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
          )
      v-spacer

      v-row
        v-col(cols='12' xs='12' sm='8' md='6')
          | Event-Datei hochladen
          v-file-input(
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
            :disabled="!valid || pin.length < 3"
          ) Hochladen
</template>

<script>
export default {
  name: "FileUpload",

  data: () => ({
    valid: true,
    pin: '',
    pinRules: [
      v => !!v || 'PIN ist erforderlich'
    ]
  }),

};
</script>
