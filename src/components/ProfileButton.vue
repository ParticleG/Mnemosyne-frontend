<template>
  <q-btn
    v-show="!loggedIn"
    flat
    icon="login"
    padding="sm"
    round
    @click="$router.push('/login')"/>
  <q-btn
    v-show="loggedIn"
    flat
    no-caps
    padding="xs"
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
                @click="goProfile()"
                style="z-index: 0">
                <q-img
                  :src="userStore.avatar"
                  style="border-radius: 50%"/>
                <q-btn
                  class="absolute-bottom-right"
                  color="secondary"
                  icon="mdi-pencil"
                  round
                  unelevated
                  size="sm"
                  @click="goProfile()"
                  style="margin-bottom: -0.25rem;margin-right: -0.5rem"/>
              </q-btn>
            </q-responsive>
          </div>
          <div class="column items-center">
            <div class="text-body1 text-weight-bold">
              {{ userStore.username }}
            </div>
            <div :class="$q.dark.isActive ? 'text-grey' : 'text-grey-8'">
              {{ userStore.motto }}
            </div>
          </div>
          <q-btn-group
            flat
            spread>
            <q-btn
              no-caps
              @click="goProfile({tab: 'relationships', type: 'following'})">
              {{ i18n('labels.following') }}<br>
              {{ userStore.statistics.following }}
            </q-btn>
            <q-separator vertical/>
            <q-btn
              no-caps
              @click="goProfile({tab: 'relationships', type: 'followers'})">
              {{ i18n('labels.followers') }}<br>
              {{ userStore.statistics.followers }}
            </q-btn>
            <q-separator vertical/>
            <q-btn
              no-caps
              @click="goProfile({tab: 'stars'})">
              {{ i18n('labels.stars') }}<br>
              {{ userStore.statistics.starred }}
            </q-btn>
          </q-btn-group>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <q-btn-group
            flat
            spread>
            <q-btn
              no-caps
              @click="goProfile({tab: 'posts'})">
              {{ i18n('labels.posts') }}<br>
              {{ userStore.statistics.posts }}
            </q-btn>
            <q-separator vertical/>
            <q-btn
              no-caps
              @click="goProfile({tab: 'collections'})">
              {{ i18n('labels.collections') }}<br>
              {{ userStore.statistics.collections }}
            </q-btn>
          </q-btn-group>
        </q-card-section>
        <q-separator/>
        <q-card-actions class="column items-center">
          <q-btn
            :color="$q.dark.isActive ? 'grey' : 'grey-9'"
            no-caps
            outline
            @click="logout">
            {{ i18n('labels.logout') }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script>
import {storeToRefs} from "pinia";
import {computed, defineComponent} from 'vue';
import {useUserStore} from "stores/user";

export default defineComponent({
  name: "ProfileButton",
  setup() {
    const userStore = useUserStore();
    const loggedIn = computed(() => {
      return userStore["id"] > 0
    });
    return {
      userStore,
      loggedIn,
    };
  },
  async created() {
    await this.userStore.check();
    this.userStore.update();
  },
  methods: {
    i18n(path) {
      return this.$t("components.profileButton." + path);
    },
    goProfile(query) {
      this.$router.push({
        name: 'profile',
        query: query,
      });
    },
    logout() {
      this.userStore.logout();
      this.$router.go(0);
    }
  }
});
</script>

<style scoped>

</style>
