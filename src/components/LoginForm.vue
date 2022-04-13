<template>
  <div class="row justify-between">
    <div class="text-h5">
      {{ i18n(`${availableTypes[typeIndex]}.labels.title`) }}
    </div>
    <q-toggle
      color="primary"
      :label="i18n('labels.usePassWord')"
      :model-value="usePassWord"
      @update:modelValue="usePassWord = $event"/>
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
      v-model="secondInput"/>
    <q-btn
      class="col-auto q-py-sm"
      color="primary"
      :disable="!firstInput||firstState.error||secondState.error"
      :loading="buttonState.loading"
      @click="submit">
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left"/>
      </template>
      {{ i18n(`labels.submit.${usePassWord ? 'password' : 'code'}`) }}
    </q-btn>
  </q-form>
</template>

<script>
import {computed, defineComponent, reactive, ref} from 'vue';

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
    const secondInput = "";
    const secondState = reactive({
      error: false,
      loading: false,
    });
    const buttonState = reactive({
      loading: false,
    });
    return {
      availableTypes,
      typeIndex,
      usePassWord,
      firstInput,
      firstState,
      secondInput,
      secondState,
      buttonState
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
    submit() {
      this.buttonState.loading = true;
      this.$api.auth.verifyEmail(
        this.firstInput.value
      ).then((data) => {
        this.$q.notify({
          type: 'positive',
          message: this.i18n('notifications.success')
        });
      }).catch((err) => {
        if (err.hasOwnProperty('data') && err.data.hasOwnProperty('code')) {
          this.$q.notify({
            type: 'warning',
            message: this.i18n('notifications.failed') + err.data.reason
          });
        } else {
          this.$q.notify({
            type: 'negative',
            message: this.i18n('notifications.error')
          });
        }
      }).finally(() => {
        this.buttonState.loading = false;
      });
    },
  },
});
</script>

<style scoped>

</style>
