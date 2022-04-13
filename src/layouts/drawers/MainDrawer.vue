<template>
  <q-drawer
    v-model="isOpen"
    elevated
    overlay>
  </q-drawer>
</template>

<script>

import {defineComponent, computed} from 'vue'

export default defineComponent({
  name: 'MainDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    }
  },
  setup(props, {emit}) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    return {isOpen};
  },
  methods: {
    i18n(relativePath) {
      return this.$t('layouts.drawers.main.' + relativePath);
    }
  },
})
</script>
