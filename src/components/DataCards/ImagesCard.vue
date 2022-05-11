<template>
  <q-card
    :dark="$q.dark.isActive"
    @mouseenter="covering = true"
    @mouseleave="covering = false"
    style="break-inside: avoid;">
    <q-img
      fit="contain"
      :src="data.preview">
      <template v-slot:loading>
        <q-skeleton class="absolute-full"/>
      </template>
      <transition
        v-if="$q.screen.gt.sm"
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp">
        <div
          v-show="covering"
          class="absolute-top text-body2">
          {{ data.name }}
        </div>
      </transition>
      <transition
        v-if="$q.screen.gt.sm"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown">
        <div
          v-show="covering"
          class="absolute-bottom">
<!--          <q-chip-->
<!--            v-for="(tag, index) in JSON.parse(data.tags).slice(0, tagCount)"-->
<!--            :key="index"-->
<!--            dense-->
<!--            :size="$q.screen.gt.md? 'sm': 'md'"-->
<!--            :label="tag"/>-->
        </div>
      </transition>
    </q-img>
    <q-card-section v-if="!$q.screen.gt.sm" class="q-pa-sm q-gutter-y-xs">
      <div class="text-body2">
        {{ data.name }}
      </div>
      <q-separator/>
      <div>
<!--        <q-chip-->
<!--          v-for="(tag, index) in JSON.parse(data.tags).slice(0, tagCount)"-->
<!--          :key="index"-->
<!--          dense-->
<!--          :size="$q.screen.lt.sm ? 'sm' : 'md'"-->
<!--          :label="tag"/>-->
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {useQuasar} from "quasar";
import {computed, defineComponent, ref} from 'vue';

export default defineComponent({
  name: "ImagesCard",
  props:{
    data: {
      type: Object,
      required: true
    },
  },
  setup() {
    const covering = ref(false);
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
    return {
      covering,
      tagCount,
    }
  },
});
</script>

<style scoped>

</style>
