<template>
  <q-page class="flex column q-pa-sm q-pa-md-md">
    <div
      v-if="!searchResults.length"
      class="absolute-center text-grey"
      :class="$q.screen.xs ? 'text-h4' : ($q.screen.sm ? 'text-h2' : 'text-h1')">
      {{ i18n('labels.noResults') }}
    </div>
    <div
      class="col-grow full-width"
      :style="{columnCount: columnCount, columnGap: 0}">
      <q-infinite-scroll
        ref="infiniteScroll"
        :offset="10"
        @load="onLoad">
        <div
          v-for="(item, index) in searchResults"
          :key="index"
          ref="resultElements"
          class="q-pb-md q-px-sm">
          <ImagesCard
            v-if="item.type === 'Images'"
            :data="item"/>
          <VideosCard
            v-if="item.type === 'Videos'"
            :data="item"/>
        </div>
      </q-infinite-scroll>
    </div>
    <div class="self-center">
      <q-spinner-dots color="primary" size="40px"/>
    </div>
  </q-page>
</template>

<script>
import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {computed, defineComponent, ref} from 'vue';
import {useRoute} from "vue-router";
import {useApi} from "boot/axios";
import {useUserStore} from "stores/user";

import ImagesCard from "components/DataCards/ImagesCard";
import VideosCard from "components/DataCards/VideosCard";
import {arrayToChunks, sleep} from "boot/config";

export default defineComponent({
  name: "SearchPage",
  components: {VideosCard, ImagesCard},
  emits: ['go-back'],
  setup() {
    const {accessToken} = storeToRefs(useUserStore());
    const searchResults = ref([]);
    const perPage = ref(30);

    const columnCount = computed(() => {
      switch (useQuasar().screen.name) {
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 6;
        default:
          return 2;
      }
    });

    return {
      accessToken,
      searchResults,
      perPage,
      columnCount
    };
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.searchResults = [];
        this.$refs.infiniteScroll["reset"]();
        this.$refs.infiniteScroll["resume"]();
        this.$refs.infiniteScroll["trigger"]();
      }
    );
  },
  methods: {
    i18n(path) {
      return this.$t('pages.searchPage.' + path);
    },
    updateSearchResults(query, page) {
      const dataType = query.type;
      const searchText = query.search;
      if (dataType && searchText) {
        return useApi.data.fuzzy(
          this.accessToken,
          dataType,
          searchText,
          page,
          this.perPage
        );
      } else {
        return Promise.resolve([]);
      }
    },
    async onLoad(index, done) {
      const {data} = await this.updateSearchResults(this.$route.query, index);
      this.searchResults.push(...data);
      done(data.length < this.perPage);
    }
  },
});
</script>
