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
    <q-item dense>
      <q-item-section>
        <q-item-label :lines="1">
          {{ data.name }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "VideosCard",
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
