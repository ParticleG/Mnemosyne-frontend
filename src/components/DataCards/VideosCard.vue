<template>
  <q-card
    class="cursor-pointer"
    :dark="$q.dark.isActive"
    v-ripple
    @click="showDetails"
    @mouseenter="play"
    @mouseleave="pause">
    <q-media-player
      ref="mediaPlayer"
      no-controls
      :poster="data.preview"
      radius="4px"
      :show-big-play-button="false"
      :source="data.content"
      type="video"
      style="aspect-ratio: 1"/>
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
  name: "VideosCard",
  components: {
    CreatorItem
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    starred: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    showDetails() {
      console.log("show details");
    },
    play() {
      this.$refs.mediaPlayer.play();
    },
    pause() {
      this.$refs.mediaPlayer.pause();
      this.$refs.mediaPlayer.setCurrentTime(0);
    }
  }
});
</script>

<style scoped>

</style>
