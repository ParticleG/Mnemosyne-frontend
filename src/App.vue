<template>
  <router-view/>
</template>

<script>
import {defineComponent} from 'vue'
import {Notify, useQuasar} from "quasar";

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    if ($q.localStorage.has("mnemosyne.settings.darkMode")) {
      $q.dark.set($q.localStorage.getItem("mnemosyne.settings.darkMode"));
    } else {
      $q.dark.set("auto");
    }
  },
  created() {
    if (this.$q.localStorage.has("mnemosyne.settings.language")) {
      this.$i18n.locale = this.$q.localStorage.getItem("mnemosyne.settings.language");
    } else {
      this.$i18n.locale = this.$q.lang.getLocale();
    }

    /** @property {Object} window */
    window.addEventListener("beforeunload", this.beforeUnload);
  },
  methods: {
    beforeUnload() {
    }
  }
})
</script>
