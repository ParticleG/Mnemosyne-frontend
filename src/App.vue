<template>
  <router-view/>
</template>

<script>
import {Notify, useQuasar} from "quasar";
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    if ($q.localStorage.has("mnemosyne.settings.darkMode")) {
      $q.dark.set($q.localStorage.getItem("mnemosyne.settings.darkMode"));
    } else {
      $q.dark.set("auto");
    }
    if ($q.platform.is.mobile) {
      $q.fullscreen.request();
    }
  },
  created() {
    if (this.$q.localStorage.has("mnemosyne.settings.language")) {
      this.$i18n.locale = this.$q.localStorage.getItem("mnemosyne.settings.language");
    } else {
      this.$i18n.locale = this.$q.lang.getLocale();
    }
  },
  methods: {}
})
</script>
