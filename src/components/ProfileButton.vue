<template>
  <q-btn
    v-show="!loggedIn"
    flat
    icon-right="login"
    :label="i18n('labels.login')"
    stretch
    @click="$router.push('/stack/login')"/>
</template>

<script>
import {useQuasar} from "quasar";
import {defineComponent, ref} from 'vue';

import {useApi} from "boot/axios";

export default defineComponent({
  name: "ProfileButton",
  setup() {
    const loggedIn = ref(false);
    const $q = useQuasar();
    const $api = useApi;
    if ($q.localStorage.has("mnemosyne.user.accessToken")) {
      $api.user.getInfo($q.localStorage.getItem("mnemosyne.user.accessToken")).then((data) => {
        loggedIn.value = true;
      }).catch((err) => {
        loggedIn.value = false;
      });

      // User.getMyInfo(
      //   this.$q.localStorage.getItem('accessToken'),
      //   Config.platform.h5
      // ).then(result => {
      //   this.loggedIn = true;
      //   this.avatar = result["avatarUrl"];
      //   this.username = result["nickName"];
      //   this.$q.localStorage.set('id', result["id"]);
      // }).catch(err => {
      //   if (err.data.hasOwnProperty('code')) {
      //     return err.data.code;
      //   } else {
      //     this.$q.notify({
      //       type: 'negative',
      //       position: 'top',
      //       message: this.i18n('notify.serverError')
      //     })
      //   }
      // }).then(result => {
      //   if (result === 102) {
      //     this.refreshToken();
      //   } else if (result) {
      //     this.$q.notify({
      //       type: 'warning',
      //       position: 'top',
      //       message: this.i18n('notify.refreshFailed')
      //     });
      //   }
      // });
    }
    return {
      loggedIn,
    };
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
