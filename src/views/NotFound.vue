<template lang="pug">
.not-found
    h1 Not Found
    router-link(:to="{name: 'Calendar'}") Kalender
    router-link(:to="{name: 'Table'}") Tabelle
</template>

<script>
export default {
    name: "NotFound"
}
</script>