<template>
  <q-page class="flex flex-center row">
    <div class="col-xl-5 col-lg-6 col-md-7 col-sm-9 col-xs-11 column">
      <q-tab-panels
        animated
        keep-alive
        v-model="tabIndex">
        <q-tab-panel
          v-for="(tab, index) in tabs"
          :key="index"
          :name="index">
          <LoginForm v-model="tab.type" @go-back="emitGoBack"/>
        </q-tab-panel>
      </q-tab-panels>
      <q-tabs
        active-color="primary"
        align="justify"
        inline-label
        v-model="tabIndex">
        <q-tab
          v-for="(tab, index) in tabs"
          :key="index"
          :disable="tab.type==='phone'"
          :icon="tab.icon"
          :label="i18n(`labels.${tab.type}`)"
          :name="index"
          no-caps/>
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';

import LoginForm from "components/LoginForm";

export default defineComponent({
  name: "LoginPage",
  components: {LoginForm},
  setup() {
    const tabIndex = ref(1);
    const tabs = [
      {
        icon: "mdi-cellphone-text",
        type: "phone",
      },
      {
        icon: "mdi-email-receive",
        type: "email",
      },
    ];
    return {tabIndex, tabs};
  },
  emits: ['go-back'],
  methods: {
    i18n(path) {
      return this.$t('pages.stack.loginPage.' + path);
    },
    emitGoBack() {
      this.$emit("go-back");
    },
  },
});
</script>

<style scoped>

</style>
