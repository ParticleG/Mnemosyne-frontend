<template>
  <q-btn
    v-show="!loggedIn"
    class="text-grey-3"
    icon-right="login"
    round
    unelevated
    :label="i18n('labels.login')"
    @click="$router.push('/stack/login')"/>
  <q-btn
    v-show="loggedIn"
    padding="xs"
    flat
    no-caps
    round>
    <q-avatar
      v-show="userStore.avatar"
      size="lg">
      <q-img :src="userStore.avatar"/>
    </q-avatar>
    <q-avatar
      v-show="!userStore.avatar"
      icon="mdi-account-circle"
      size="lg"/>
    <q-menu :offset="[0, 10]" style="min-width:22rem">
      <q-card bordered>
        <q-card-section class="q-gutter-sm">
          <div class="row justify-center">
            <q-responsive
              class="col-3"
              :ratio="0.25">
              <q-btn
                round
                dense
                flat
                style="z-index: 0">
                <q-img
                  :src="userStore.avatar"
                  style="border-radius: 50%"/>
              </q-btn>
            </q-responsive>
          </div>
          <div class="column items-center">
            <div class="text-body1 text-weight-bold">
              {{ userStore.username }}
            </div>
            <div :class="$q.dark.isActive ? 'text-grey' : 'text-grey-8'">
              {{ userStore.email }}
            </div>
          </div>
          <div class="column items-center">
            <q-btn
              class="q-px-md text-weight-regular"
              :color="$q.dark.isActive ? 'grey' : 'grey-9'"
              dense
              no-caps
              no-wrap
              outline
              rounded
              @click="$router.push('/main/profile')">
              {{ i18n('labels.manage') }}
            </q-btn>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-actions class="column items-center">
          <q-btn
            :color="$q.dark.isActive ? 'grey' : 'grey-9'"
            no-caps
            outline
            @click="userStore.logout">
            {{ i18n('labels.logout') }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import {defineComponent, ref} from 'vue';

import {useUserStore} from "stores/user";

export default defineComponent({
  name: "ProfileButton",
  setup() {
    const loggedIn = ref(false);

    const userStore = useUserStore();

    return {
      userStore,
      loggedIn,
    };
  },
  async created() {
    this.loggedIn = await this.userStore.check();
  },
  methods: {
    i18n(path) {
      return this.$t("components.profileButton." + path);
    },
  }
});
</script>

<style scoped>

</style>
