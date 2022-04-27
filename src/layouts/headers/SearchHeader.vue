<template>
  <q-header bordered class="bg-white">
    <q-toolbar
      class="q-electron-drag q-py-md q-gutter-x-sm"
      :class="$q.dark.isActive ? 'text-white' : 'text-black'">
      <div
        class="row col-grow justify-center items-center q-gutter-sm">
        <q-btn
          dense
          flat
          no-caps
          rounded
          stretch
          @click="$router.push('/')">
          <q-avatar>
            <AppLogo :fill="getPaletteColor($q.dark.isActive ? 'white' : 'black')"/>
          </q-avatar>
          <div v-if="!$q.screen.sm" class="text-h6">
            {{ i18n("labels.title") }}
          </div>
        </q-btn>
        <q-form
          :class="$q.screen.lt.sm ? 'full-width' : 'col-grow'"
          @submit="submit">
          <q-input
            clearable
            debounce="1000"
            dense
            outlined
            :placeholder="i18n('labels.search')"
            rounded
            v-model="searchText">
            <template v-slot:append>
              <q-btn
                dense
                flat
                icon="search"
                round
                @click="submit"/>
            </template>
          </q-input>
        </q-form>
        <div v-if="$q.screen.lt.sm" class="absolute-top-right q-pt-xs q-pr-xs">
          <ProfileButton/>
        </div>
      </div>
      <div v-if="$q.screen.gt.sm" class="col-1 col-lg-2"/>
      <div v-if="!$q.screen.lt.sm">
        <ProfileButton/>
        <q-btn
          flat
          icon="language"
          round>
          <LanguagesMenu/>
        </q-btn>
        <q-btn
          flat
          icon="settings"
          round>
          <SettingsMenu/>
        </q-btn>
      </div>
      <div v-if="$q.platform.is.electron" class="row q-gutter-x-sm">
        <q-btn dense flat icon="minimize" @click="minimize"/>
        <q-btn dense flat icon="crop_square" @click="toggleMaximize"/>
        <q-btn dense flat icon="close" @click="closeApp"/>
      </div>
    </q-toolbar>
    <q-toolbar
      class="q-pl-sm-xl q-ml-md-xl">
      <TypeTabs
        class="q-pl-md-xl q-ml-md-md"
        :class="$q.dark.isActive ? 'text-light' : 'text-dark'"
        v-model="dataType"/>
    </q-toolbar>
  </q-header>
</template>

<script>
import {colors} from "quasar";
import {defineComponent, ref} from "vue";
import {useRoute} from "vue-router";
import {DataTypes} from "boot/config";

import SettingsMenu from "components/SettingsMenu";
import LanguagesMenu from "components/LanguagesMenu";
import ProfileButton from "components/ProfileButton";
import AppLogo from "components/AppLogo";
import TypeTabs from "components/TypeTabs";

export default defineComponent({
  name: "MainHeader",
  components: {TypeTabs, AppLogo, ProfileButton, LanguagesMenu, SettingsMenu},
  setup() {
    const {getPaletteColor} = colors;
    const $route = useRoute();
    const dataType = ref($route.query.type || DataTypes[3].name);
    const searchText = ref($route.query.search || "");

    return {getPaletteColor, searchText, dataType};
  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.headers.search." + relativePath);
    },
    submit() {
      if (!this.searchText) {
        return;
      }
      this.$router.push({
        name: "search",
        query: {
          type: this.dataType,
          search: this.searchText
        }
      });
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
