<template>
  <q-item dense>
    <q-item-section
      v-show="$q.screen.gt.xs"
      avatar>
      <q-btn
        flat
        no-caps
        padding="xs"
        round>
        <q-avatar
          v-show="creator.avatar"
          size="lg">
          <q-img :src="creator.avatar"/>
        </q-avatar>
        <q-avatar
          v-show="!creator.avatar"
          icon="mdi-account-circle"
          size="lg"/>
      </q-btn>
    </q-item-section>
    <q-item-section>
      <q-item-label :lines="1">
        {{ name }}
      </q-item-label>
      <q-item-label caption :lines="1">
        {{ creator.username }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn
        :color="starred ? 'amber' : undefined"
        dense
        flat
        :icon="starred ? 'mdi-star' : 'mdi-star-outline'"
        stack
        @click.stop.prevent="star">
        {{ Math.round(Math.random() * 1000) }}
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: "CreatorItem",
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    starred: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return {
      creator: ref({}),
    }
  },
  created() {
    this.getCreatorInfo();
  },
  methods: {
    async getCreatorInfo() {
      const {data: creatorInfo} = await this.$api.user.getInfo(null, this.modelValue);
      this.creator = creatorInfo;

      const avatarKey = `mnemosyne.caches.avatar.${creatorInfo.id}`;
      const avatarHashKey = `mnemosyne.caches.avatarHash.${creatorInfo.id}`;
      let avatarHash = "";
      if (this.$q.localStorage.has(avatarHashKey)) {
        avatarHash = this.$q.localStorage.getItem(avatarHashKey);
      }
      if (avatarHash !== creatorInfo.avatar_hash) {
        const {data: avatar} = await this.$api.user.getAvatar(null, creatorInfo.id);
        this.creator.avatar = avatar;
        this.$q.localStorage.set(avatarKey, avatar);
        this.$q.localStorage.set(avatarHashKey, creatorInfo.avatar_hash);
      } else {
        this.creator.avatar = this.$q.localStorage.getItem(avatarKey);
      }
    },
    star() {

    }
  }
});
</script>

<style scoped>

</style>
