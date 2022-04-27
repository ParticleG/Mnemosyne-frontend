<template>
  <q-page class="flex q-pa-sm q-pa-md-md">
    <div
      v-if="!searchResults.length"
      class="absolute-center text-grey"
      :class="$q.screen.xs ? 'text-h4' : ($q.screen.sm ? 'text-h2' : 'text-h1')">
      {{ i18n('labels.noResults') }}
    </div>
    <div
      class="col-grow"
      :style="{columnCount: columnCount, columnGap: 0}">
      <q-card
        v-for="(item, index) in searchResults"
        :key="index"
        class="q-mb-md q-mx-sm"
        @mouseenter="covers[index] = true"
        @mouseleave="covers[index] = false"
        style="break-inside: avoid;">
        <q-img
          fit="contain"
          :src="item.content">
          <template v-slot:loading>
            <q-skeleton class="absolute-full"/>
          </template>
          <transition
            v-if="$q.screen.gt.sm"
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutUp">
            <div
              v-show="covers[index]"
              class="absolute-top text-body2">
              {{ item.name }}
            </div>
          </transition>
          <transition
            v-if="$q.screen.gt.sm"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown">
            <div
              v-show="covers[index]"
              class="absolute-bottom">
              <q-chip
                v-for="(tag, index) in JSON.parse(item.tags).slice(0, tagCount)"
                :key="index"
                dense
                :size="$q.screen.gt.md? 'sm': 'md'"
                :label="tag"/>
            </div>
          </transition>
        </q-img>
        <q-card-section v-if="!$q.screen.gt.sm" class="q-pa-sm q-gutter-y-xs">
          <div class="text-body2">
            {{ item.name }}
          </div>
          <q-separator/>
          <div>
            <q-chip
              v-for="(tag, index) in JSON.parse(item.tags).slice(0, tagCount)"
              :key="index"
              dense
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
              :label="tag"/>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {computed, defineComponent, ref, watch} from 'vue';
import {useRoute} from "vue-router";
import {useApi} from "boot/axios";
import {useUserStore} from "stores/user";

export default defineComponent({
  name: "SearchPage",
  emits: ['go-back'],
  setup() {
    const {accessToken} = storeToRefs(useUserStore());
    const searchResults = ref([]);
    const covers = ref([]);

    const tagCount = computed(() => {
      switch (useQuasar().screen.name) {
        case "xs":
          return 5;
        case "sm":
          return 10;
        case "md":
          return 6;
        case "lg":
          return 8;
        default:
          return 10;
      }
    });

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

    const updateSearchResults = (query) => {
      const dataType = query.type;
      const searchText = query.search;
      if (dataType && searchText) {
        useApi.data.fuzzy(accessToken, dataType, searchText).then(({data}) => {
          searchResults.value = data;
        });
      }
    };
    updateSearchResults(useRoute().query);

    return {accessToken, searchResults, covers, tagCount, columnCount, updateSearchResults};
  },
  created() {
    this.$watch(
      () => this.$route.query,
      query => this.updateSearchResults(query)
    );
  },
  methods: {
    i18n(path) {
      return this.$t('pages.searchPage.' + path);
    },
    emitGoBack() {
      this.$emit("go-back");
    },
  },
});
</script>
