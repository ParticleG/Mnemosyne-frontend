<template>
  <q-header>
    <q-toolbar class="bg-white text-black q-electron-drag">
      <q-btn
        flat
        dense
        round
        icon="menu"
        @click="$emit('click:leftMenu')"/>
      <q-btn
        flat
        no-caps
        stretch
        @click="$router.push('/')">
        <q-avatar>
          <AppLogo :fill="getPaletteColor('black')"/>
        </q-avatar>
        <div class="text-h6">
          {{ i18n("labels.title") }}
        </div>
      </q-btn>
      <q-space/>
      <q-btn flat round icon="language">
        <LanguagesMenu/>
      </q-btn>
      <q-btn flat round icon="settings">
        <SettingsMenu/>
      </q-btn>
      <ProfileButton/>
      <div v-if="$q.platform.is.electron" class="row q-ml-sm q-gutter-x-sm">
        <q-btn dense flat icon="minimize" @click="minimize"/>
        <q-btn dense flat icon="crop_square" @click="toggleMaximize"/>
        <q-btn dense flat icon="close" @click="closeApp"/>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import {colors} from "quasar";
import {defineComponent} from "vue";

import SettingsMenu from "components/SettingsMenu";
import LanguagesMenu from "components/LanguagesMenu";
import ProfileButton from "components/ProfileButton";
import AppLogo from "components/AppLogo";

export default defineComponent({
  name: "MainHeader",
  components: {AppLogo, ProfileButton, LanguagesMenu, SettingsMenu},
  setup() {
    const {getPaletteColor} = colors;
    return {getPaletteColor};
  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.headers.main." + relativePath);
    },
    minimize() {
      if (process.env.MODE === "electron") {
        /** @property {Object} window */
        window["electronWindowApi"].minimize();
      }
    },
    toggleMaximize() {
      if (process.env.MODE === "electron") {
        /** @property {Object} window */
        window["electronWindowApi"].toggleMaximize();
      }
    },
    closeApp() {
      if (process.env.MODE === "electron") {
        /** @property {Object} window */
        window["electronWindowApi"].close();
      }
    }
  }
});
</script>

<style scoped>

</style>
