<template>
  <q-tabs
    active-color="primary"
    dense
    indicator-color="primary"
    inline-label
    no-caps
    v-model="dataType"
    style="max-width: 100%;">
    <q-tab
      v-for="(type, index) in DataTypes"
      :key="index"
      :disable="type.disable"
      :icon="$q.screen.lt.sm ? undefined : type.icon"
      :label="i18n(`labels.${type.name}`)"
      :name="type.name"/>
  </q-tabs>
</template>

<script>
import {computed, defineComponent} from 'vue';
import {DataTypes} from "boot/config";

export default defineComponent({
  name: "TypeTabs",
  props: {
    modelValue: {
      type: String,
      required: true,
    }
  },
  setup(props, {emit}) {
    const dataType = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    return {
      dataType,
      DataTypes,
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("components.typeTabs." + relativePath);
    },
  }
});
</script>

<style scoped>

</style>
