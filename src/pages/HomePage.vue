<template>
  <q-page class="flex flex-center row">
    <div class="col-9 col-sm-10 col-xs-11 column q-gutter-y-sm q-gutter-sm-y-md">
      <div
        class="text-center text-weight-regular"
        :class="textSize">
        {{ i18n("labels.title") }}
      </div>
      <TypeTabs class="q-px-md" v-model="dataType"/>
      <q-form @submit="submit">
        <q-input
          name="searchText"
          :dense="$q.screen.lt.sm"
          debounce="1000"
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
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        color="primary"
        fab
        icon="add"
        @click="uploadDialog"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {useQuasar} from "quasar";
import {computed, defineComponent, ref} from 'vue';
import {DataTypes} from "boot/config";

import UploadDialog from "components/UploadDialog";
import TypeTabs from "components/TypeTabs";

export default defineComponent({
  name: "HomePage",
  components: {TypeTabs},
  setup() {
    const $q = useQuasar();
    const textSize = computed(() => {
      switch ($q.screen.name) {
        case "xl":
        case "lg":
          return "text-h1";
        case "md":
        case "sm":
          return "text-h2";
        default:
          return "text-h3";
      }
    });
    const searchText = ref("");
    const dataType = ref(DataTypes[0].name);
    return {
      textSize,
      searchText,
      dataType
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.homepage." + relativePath);
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
    uploadDialog() {
      this.$q.dialog({
        component: UploadDialog,
      });
    }
  }
});
</script>

<style scoped>

</style>
