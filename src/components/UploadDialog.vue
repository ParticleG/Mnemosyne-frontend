<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar full-width" style="min-width: 35vw">
      <q-card-section>
        <div class="text-h6">{{ i18n("labels.title") }}</div>
      </q-card-section>
      <q-card-section>
        <TypeTabs :hidden="[0]" v-model="dataType"/>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <q-input
          clearable
          :dense="$q.screen.lt.sm"
          outlined
          :placeholder="i18n('labels.name')"
          v-model="dataName"/>
        <q-input
          clearable
          :dense="$q.screen.lt.sm"
          outlined
          :placeholder="i18n('labels.description')"
          v-model="dataDescription"/>
        <q-select
          ref="dataTypeSelect"
          :dense="$q.screen.lt.sm"
          outlined
          hide-dropdown-icon
          multiple
          :placeholder="i18n('labels.tags')"
          use-input
          use-chips
          @new-value="insertTags"
          v-model="dataTags"/>
        <q-select
          v-if="false"
          :dense="$q.screen.lt.sm"
          outlined
          :placeholder="i18n('labels.collection')"
          v-model="dataCollection"/>
        <div class="row">
          <q-input
            class="col-grow"
            clearable
            :dense="$q.screen.lt.sm"
            outlined
            :placeholder="i18n('labels.content')"
            v-model="dataContent"/>
          <q-toggle
            false-value="link"
            true-value="file"
            unchecked-icon="mdi-link"
            checked-icon="mdi-file-upload"
            :size="$q.screen.lt.sm ? 'md' : 'lg'"
            :label="i18n(`labels.${contentType}`)"
            v-model="contentType"/>
        </div>
        <q-slide-transition>
          <div v-show="advanced" class="q-gutter-y-sm">
            <q-slider
              class="q-mt-lg q-px-sm"
              :color="sliderColors[dataVisibility]"
              :min="0"
              :max="2"
              label
              label-always
              :label-value="i18n(`slider.${dataVisibility}`)"
              markers
              marker-labels
              track-size="8px"
              v-model="dataVisibility"/>
            <q-input
              clearable
              :dense="$q.screen.lt.sm"
              outlined
              :placeholder="i18n('labels.preview')"
              v-model="dataPreview"/>
            <q-input
              clearable
              :dense="$q.screen.lt.sm"
              outlined
              :placeholder="i18n('labels.extra')"
              v-model="dataExtra"/>
          </div>
        </q-slide-transition>
        <div class="row justify-end">
          <q-btn
            color="primary"
            dense
            flat
            :label="i18n(`labels.${advanced ? 'less' : 'more'}`)"
            @click="advanced = !advanced"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn
          :dense="$q.screen.lt.sm"
          color="primary"
          flat
          @click="cancel">
          {{ i18n("labels.cancel") }}
        </q-btn>
        <q-btn
          :dense="$q.screen.lt.sm"
          color="primary"
          :loading="uploading"
          @click="upload">
          {{ i18n("labels.upload") }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {useDialogPluginComponent} from "quasar";
import {defineComponent, ref} from 'vue';
import {DataTypes} from "boot/config";
import {useUserStore} from "stores/user";

import TypeTabs from "components/TypeTabs";

export default defineComponent({
  name: "UploadDialog",
  components: {TypeTabs},
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    const userStore = useUserStore();

    const sliderColors = ["red", "orange", "blue", "green"];

    const dataType = ref(DataTypes[2].name);
    const dataName = ref("");
    const dataDescription = ref("");
    const dataTags = ref([]);
    const dataCollection = ref(-1);
    const dataContent = ref("");
    const dataVisibility = ref(2);
    const dataPreview = ref("");
    const dataExtra = ref("");

    const contentType = ref("link");
    const advanced = ref(false);

    const uploading = ref(false);
    return {
      dialogRef,
      onDialogHide,
      userStore,
      sliderColors,
      dataType,
      dataName,
      dataDescription,
      dataTags,
      dataCollection,
      dataContent,
      dataVisibility,
      dataPreview,
      dataExtra,
      contentType,
      advanced,
      uploading
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("components.uploadDialog." + relativePath);
    },
    insertTags(val, done) {
      if (val.length > 0) {
        const modelValue = (this.dataTags || []).slice();
        val.split(
          /[,;|]+/
        ).map(
          v => v.trim()
        ).filter(
          v => v.length > 0
        ).forEach(v => {
          if (!modelValue.includes(v)) {
            modelValue.push(v);
          }
        });
        done("");
        this.dataTags = modelValue;
      }
    },
    cancel() {
      this.hide();
    },
    async upload() {
      try {
        this.uploading = true;
        await this.$api.data.upload(
          this.userStore.accessToken,
          this.dataType,
          {
            name: this.dataName,
            description: this.dataDescription,
            tags: this.dataTags,
            content: this.dataContent,
            extra: this.dataExtra,
            preview: this.dataPreview,
            collection: this.dataCollection,
            visibility: this.dataVisibility,
          }
        );
        this.$q.notify({
          type: 'positive',
          message: this.i18n(`notifications.submit.success`),
        });
        setTimeout(() => {
          this.hide();
        }, 500);
      } catch (err) {
        this.errorHandler(err, "submit");
      } finally {
        this.uploading = false;
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
  }
});
</script>
