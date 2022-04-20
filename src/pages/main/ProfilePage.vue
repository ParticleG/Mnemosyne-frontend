<template>
  <q-page class="flex row q-pa-md">
    <div class="col-md-2 col-12 q-pa-sm">
      <q-tabs
        inline-label
        no-caps
        vertical>
        <q-tab
          icon="mdi-card-account-details-outline"
          :label="'Placeholder'"/>
        <q-tab
          icon="mdi-card-account-details-outline"
          :label="'Placeholder'"/>
        <q-tab
          icon="mdi-card-account-details-outline"
          :label="'Placeholder'"/>
        <q-tab
          icon="mdi-card-account-details-outline"
          :label="'Placeholder'"/>
        <q-tab
          icon="mdi-card-account-details-outline"
          :label="'Placeholder'"/>
        <q-tab
          icon="mdi-card-account-details-outline"
          :label="'Placeholder'"/>
      </q-tabs>
    </div>
    <div class="col-md-10 col-12 q-pa-sm">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{"Basic information"}}
          </div>
          <div class="text-subtitle2">
            {{"Other user of Mnemosyne may could see your information."}}
          </div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item clickable>
              <q-item-section>
                <q-item-label>
                  {{"Avatar"}}
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
                  {{"Username"}}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                {{ userStore.username }}
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label>
                  {{"Motto"}}
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
import {defineComponent} from 'vue';
import {useUserStore} from "stores/user";

export default defineComponent({
  name: "ProfilePage",
  setup() {
    const userStore = useUserStore();
    return {userStore};
  },
  created() {
    this.userStore.update();
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.main.profile." + relativePath);
    },
  }
});
</script>

<style scoped>

</style>
