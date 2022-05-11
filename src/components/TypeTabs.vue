<template>
  <q-tabs
    active-color="primary"
    dense
    indicator-color="primary"
    inline-label
    no-caps
    :model-value="dataType"
    @update:model-value="onDataTypeChange"
    style="max-width: 100%;">
    <q-tab
      v-for="(type, index) in availableTypes"
      :key="index"
      :disable="processing"
      :icon="$q.screen.lt.sm ? undefined : type.icon"
      :label="i18n(`labels.${type.name}`)"
      :name="type.name"/>
  </q-tabs>
</template>

<script>
import {computed, defineComponent, ref} from 'vue';
import {DataTypes} from "boot/config";

export default defineComponent({
  name: "TypeTabs",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    hidden: {
      type: Array,
      default: () => [],
    },
    changeHandler: {
      type: Function,
    }
  },
  setup(props, {emit}) {
    const dataType = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    const availableTypes = computed(() => {
      return DataTypes.filter((_, index) => !props.hidden.includes(index));
    });
    const processing = ref(false);
    const onDataTypeChange = async (value) => {
      dataType.value = value;
      if (props.changeHandler) {
        processing.value = true;
        try {
          await props.changeHandler(value);
        } catch (e) {
          console.error(e);
        }
        processing.value = false;
      }
    };

    return {
      dataType,
      availableTypes,
      processing,
      onDataTypeChange
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
