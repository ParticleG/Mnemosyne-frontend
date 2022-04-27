<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar full-width" style="min-width: 35vw">
      <q-card-section>
        <div class="text-h6">{{ i18n("labels.title") }}</div>
      </q-card-section>
      <q-card-section>
        <TypeTabs v-model="dataType"/>
      </q-card-section>
      <q-card-section class="q-gutter-y-sm">
        <q-input
          clearable
          :dense="$q.screen.lt.sm"
          outlined
          :placeholder="i18n('labels.name')"
          v-model="dataName"/>
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
          <div v-show="advanced">
            <q-slider
              class="q-mt-lg q-px-sm"
              :color="sliderColors[dataVisibility]"
              :min="0"
              :max="3"
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
              :placeholder="i18n('labels.extra')"
              v-model="dataExtra"/>
          </div>
        </q-slide-transition>
        <div class="row justify-end">
          <q-btn
            color="primary"
            dense
            flat
            :label="i18n('labels.advanced')"
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

    const dataType = ref(DataTypes[3].name);
    const dataName = ref("");
    const dataTags = ref([]);
    const dataCollection = ref(-1);
    const dataContent = ref("");
    const dataVisibility = ref(3);
    const dataExtra = ref("");

    const contentType = ref("link");
    const advanced = ref(false);
    return {
      dialogRef,
      onDialogHide,
      userStore,
      sliderColors,
      dataType,
      dataName,
      dataTags,
      dataCollection,
      dataContent,
      dataVisibility,
      dataExtra,
      contentType,
      advanced
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
      console.log({
        type: this.dataType,
        name: this.dataName,
        tags: this.dataTags,
        collection: this.dataCollection,
        content: this.dataContent,
        visibility: this.dataVisibility,
        extra: this.dataExtra,
      });
      // try {
      //   await this.$api.data.upload(
      //     this.userStore.accessToken,
      //     this.dataType,
      //     {
      //       name: this.dataName,
      //       tags: this.dataTags,
      //       collection: this.dataCollection,
      //       content: this.dataContent,
      //       visibility: this.dataVisibility,
      //       extra: this.dataExtra,
      //     }
      //   );
      // } catch (err) {
      //   this.errorHandler(err, "submit");
      // }
      // this.hide();
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
