<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view @go-back="goBack"/>
      <q-page-sticky expand position="top-left">
        <q-btn
          class="q-ma-sm"
          dense
          flat
          icon="arrow_back"
          :label="i18n('labels.back')"
          @click="goBack"/>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import {ref} from "vue";

export default {
  name: "StackLayout",
  data() {
    return {
      lastRoute: ref('')
    }
  },
  beforeRouteEnter(to, from, next) {
    next(inst => {
      inst.lastRoute = from.path;
    });
  },
  methods: {
    i18n(path) {
      return this.$t('layouts.stack.' + path);
    },
    goBack() {
      if (this.lastRoute) {
        let pos = this.lastRoute.toString().search(/^\/(main|stack)\/.*$/);
        if (pos !== -1) {
          this.$router.go(-1);
        } else {
          this.$router.replace('/');
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
