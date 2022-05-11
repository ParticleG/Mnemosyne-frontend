<template>
  <q-card
    :dark="$q.dark.isActive"
    style="break-inside: avoid;">
    <q-media-player
      :poster="data.preview"
      :source="data.content"
      radius="4px"
      type="video"/>
  </q-card>
</template>

<script>
import {computed, defineComponent, ref} from 'vue';

export default defineComponent({
  name: "VideosCard",
  props: {
    data: {
      type: Object,
      required: true
    },
  },
});
</script>

<style scoped>

</style>
