<template>
  <q-card
    class="cursor-pointer"
    :dark="$q.dark.isActive"
    v-ripple>
    <q-img
      :ratio="1"
      :src="data.content">
      <template v-slot:loading>
        <q-skeleton class="absolute-full"/>
      </template>
    </q-img>
    <q-item dense>
      <q-item-section>
        <q-item-label :lines="1">
          {{ data.name }}
        </q-item-label>
        <q-item-label caption :lines="1">
          {{ data.description || "No description"  }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "ImagesCard",
  props: {
    data: {
      type: Object,
      required: true
    },
    starred: {
      type: Boolean,
      required: true,
    }
  }
});
</script>

<style scoped>

</style>
