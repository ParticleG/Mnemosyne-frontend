<template>
  <q-page class="flex row q-py-md q-gutter-x-md">
    <div class="col-md-2 col-12">
      <q-tabs
        active-color="white"
        active-bg-color="primary"
        indicator-color="transparent"
        inline-label
        no-caps
        vertical
        v-model="currentTab">
        <q-tab
          v-for="(tab, index) in tabs"
          :key="index"
          content-class="absolute-left q-pl-md"
          :icon="tab.icon"
          :label="i18n(`tabs.${tab.name}`)"
          :name="tab.name"
          style="border-top-right-radius: 3rem; border-bottom-right-radius: 3rem"/>
      </q-tabs>
    </div>
    <q-separator vertical/>
    <div class="col-grow">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ "Basic information" }}
          </div>
          <div class="text-subtitle2">
            {{ "Other user of Mnemosyne may could see your information." }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item clickable>
              <q-item-section>
                <q-item-label>
                  {{ "Avatar" }}
                </q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="userStore.avatar" style="border-radius: 50%"/>
                </q-avatar>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label>
                  {{ "Username" }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                {{ userStore.username }}
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label>
                  {{ "Motto" }}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                {{ userStore.motto }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {useRoute} from "vue-router";
import {useUserStore} from "stores/user";

export default defineComponent({
  name: "ProfilePage",
  setup() {
    const $route = useRoute();
    const userStore = useUserStore();
    const tabs = [
      {
        name: "info",
        icon: "mdi-card-account-details-outline"
      },
      {
        name: "relationships",
        icon: "mdi-account-supervisor-outline"
      },
      {
        name: "stars",
        icon: "mdi-folder-star-outline"
      },
      {
        name: "posts",
        icon: "mdi-post-outline"
      },
      {
        name: "collections",
        icon: "mdi-text-box-multiple-outline"
      },
    ];
    const currentTab = ref(tabs[0].name);

    let preferredTab = $route.query.tab;
    if (preferredTab) {
      for (let index in tabs) {
        if (tabs[index].name === preferredTab) {
          currentTab.value = preferredTab;
          break;
        }
      }
    }
    return {userStore, tabs, currentTab};
  },
  created() {
    this.userStore.update();
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.profile." + relativePath);
    },
  }
});
</script>

<style scoped>

</style>
