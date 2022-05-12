<template>
  <q-card
    class="cursor-pointer"
    :dark="$q.dark.isActive"
    v-ripple>
    <q-img
      :ratio="1"
      :src="data.preview">
      <template v-slot:loading>
        <q-skeleton class="absolute-full"/>
      </template>
    </q-img>
    <CreatorItem
      :modelValue="data.creator"
      :name="data.name"
      :starred="starred"/>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue';
import CreatorItem from "components/CreatorItem";

export default defineComponent({
  name: "ImagesCard",
  components: {CreatorItem},
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
