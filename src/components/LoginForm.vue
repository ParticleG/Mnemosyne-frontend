<template>
  <div class="row justify-between q-my-md">
    <div class="text-h5">
      {{ i18n(`${availableTypes[typeIndex]}.labels.title`) }}
    </div>
    <q-btn
      color="primary"
      dense
      flat
      no-caps
      @click="usePassWord = !usePassWord">
      {{ i18n(`labels.options.${usePassWord ? 'code' : 'password'}`) }}
    </q-btn>
  </div>
  <q-form
    class="column q-gutter-y-md">
    <q-input
      autofocus
      clearable
      :error="firstState.error"
      :error-message="i18n(`${availableTypes[typeIndex]}.labels.firstError`)"
      :label="i18n(`${availableTypes[typeIndex]}.labels.firstInput`)"
      :loading="firstState.loading"
      outlined
      v-model="firstInput"/>
    <q-input
      clearable
      :counter="!usePassWord"
      :error="secondState.error"
      :error-message="i18n(`labels.secondError.${usePassWord ?'password':'code'}`)"
      :label="i18n(`labels.secondInput.${usePassWord ?'password':'code'}`)"
      :loading="secondState.loading"
      :maxlength="usePassWord ? null : 8"
      outlined
      :type="usePassWord ? 'password' : 'text'"
      v-model="secondInput">
      <template v-slot:append>
        <q-btn
          v-if="!usePassWord"
          class="q-ma-none"
          color="primary"
          dense
          :disable="!firstInput||firstState.error"
          flat
          :loading="sendCodeState.loading"
          no-caps
          stretch
          @click="sendCode">
          <template v-slot:loading>
            <q-spinner-dots/>
          </template>
          {{ i18n("labels.sendCode") }}
        </q-btn>
      </template>
    </q-input>
    <q-btn
      class="col-auto q-py-sm"
      color="primary"
      :disable="!firstInput||firstState.error||secondState.error"
      :loading="submitState.loading"
      @click="submit">
      <template v-slot:loading>
        <q-spinner class="on-left"/>
        {{ i18n("labels.submit") }}
      </template>
      {{ i18n("labels.submit") }}
    </q-btn>
  </q-form>
</template>

<script>
import {computed, defineComponent, reactive, ref} from 'vue';
import {useUserStore} from "stores/user";

export default defineComponent({
  name: "LoginForm",
  props: {
    modelValue: {
      type: String,
      required: true,
      default: () => "email"
    },
  },
  setup(props) {
    const availableTypes = ["email", "phone"];
    const typeIndex = computed(() => {
      return availableTypes.includes(props.modelValue)
        ? availableTypes.indexOf(props.modelValue)
        : 0;
    });
    const usePassWord = ref(false);
    const firstInput = ref("");
    const firstState = reactive({
      error: computed(() => {
        if (!firstInput.value) {
          return false;
        }
        switch (typeIndex.value) {
          case 0:
            if (!firstInput.value.hasOwnProperty("length") ||
              firstInput.value.length >= 255) {
              return true;
            }
            return !firstInput.value.match(/^([a-zA-Z\d]+[-_.]?)+@([a-zA-Z\d]+[-_.]?)+\.[a-z]+$/);
          case 1:
            return !firstInput.value.match(/^1\d{10}$/);
        }
        return false;
      }),
      loading: false,
    });
    const secondInput = ref("");
    const secondState = reactive({
      error: false,
      loading: false,
    });
    const sendCodeState = reactive({
      loading: false,
    });
    const submitState = reactive({
      loading: false,
    });
    const userStore = useUserStore();
    return {
      availableTypes,
      typeIndex,
      usePassWord,
      firstInput,
      firstState,
      secondInput,
      secondState,
      sendCodeState,
      submitState,
      userStore,
    };
  },
  emits: ['go-back'],
  methods: {
    i18n(path) {
      return this.$t('components.loginForm.' + path);
    },
    emitGoBack() {
      this.$emit('go-back');
    },
    sendCode() {
      this.sendCodeState.loading = true;
      this.$api.auth.verifyEmail(
        this.firstInput
      ).then(() => {
        this.$q.notify({
          type: 'positive',
          message: this.i18n('notifications.sendCode.success')
        });
      }).catch((err) => {
        this.errorHandler(err, "sendCode");
      }).finally(() => {
        this.sendCodeState.loading = false;
      });
    },
    async submit() {
      this.submitState.loading = true;
      let body;
      try {
        if (this.usePassWord) {
          body = await this.$api.auth.loginEmailPassword(
            this.firstInput,
            this.secondInput
          );
        } else {
          body = await this.$api.auth.loginEmailCode(
            this.firstInput,
            this.secondInput
          );
        }
        console.log(body);
        const data = body.data;
        this.userStore.accessToken = data.accessToken;
        this.userStore.refreshToken = data.refreshToken;
        console.log(this.userStore.accessToken, this.userStore.refreshToken);
        await this.userStore.update();
      } catch (err) {
        this.errorHandler(err, "submit");
      }
      this.submitState.loading = false;
      if (body.code === 201) {
        // TODO: Goto modify user info page
        await this.$router.push('/main/profile');
      } else {
        this.emitGoBack();
      }
    },
    errorHandler(err, notifyType) {
      if (err.hasOwnProperty('data') && err.data.hasOwnProperty('code')) {
        this.$q.notify({
          type: 'warning',
          message: this.i18n(`notifications.${notifyType}.failed`) + this.$t(err.data.message),
          caption: err.data.reason
        });
      } else {
        this.$q.notify({
          type: 'negative',
          message: this.i18n(`notifications.${notifyType}.error`)
        });
      }
    }
  },
});
</script>

<style scoped>

</style>
