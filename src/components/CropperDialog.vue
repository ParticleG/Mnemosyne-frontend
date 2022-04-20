<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    style="min-width: 50vw">
    <q-card style="width: 700px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ i18n("labels.title") }}</div>
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>

      <q-card-section class="row items-center justify-around q-pa-md">
        <div class="col-12">
          <vueCropper
            ref="cropper"
            autoCrop
            fixed
            centerBox
            infoTrue
            :fixedNumber="[1,1]"
            :maxImgSize="1024"
            :img="image"
            :outputSize="cropper.size"
            :outputType="cropper.outputType"
            @realTime="realTime"
            @imgLoad="imgLoad"
            :style="cropper.style"/>
        </div>
        <div class="row col-4 justify-start q-pa-sm">
          {{ i18n("labels.preview") }}
        </div>
        <div class="row col-8 justify-end q-pa-sm">
          <q-btn-group>
            <q-btn
              class="q-mx-md-sm q-ml-xs-xs"
              color="primary"
              icon-right="zoom_in"
              :dense="$q.screen.lt.md"
              @click="$refs.cropper.changeScale(1)"/>
            <q-btn
              class="q-mx-md-sm q-ml-xs-xs"
              color="primary"
              icon-right="zoom_out"
              :dense="$q.screen.lt.md"
              @click="$refs.cropper.changeScale(-1)"/>
            <q-btn
              class="q-mx-md-sm q-ml-xs-xs"
              color="primary"
              icon-right="rotate_left"
              :dense="$q.screen.lt.md"
              @click="$refs.cropper.rotateLeft()"/>
            <q-btn
              class="q-mx-md-sm q-ml-xs-xs"
              color="primary"
              icon-right="rotate_right"
              :dense="$q.screen.lt.md"
              @click="$refs.cropper.rotateRight()"/>
          </q-btn-group>
        </div>

        <div class="gt-sm col-8 q-ma-sm" :style="previewStyle">
          <q-img :src="realTimeData.url" :style="realTimeData.img"/>
        </div>
      </q-card-section>

      <q-card-section class="row justify-center q-px-md">
        <q-file
          ref="imageUploader"
          accept="image/jpg,image/jpeg,image/webp,image/png,image/bmp"
          bottom-slots
          clearable
          counter
          outlined
          :dense="$q.screen.lt.md"
          :label="i18n('labels.uploadImage')"
          v-model="file"
          @input="updateImage">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop/>
          </template>
        </q-file>
      </q-card-section>
      <q-card-section class="row justify-end q-px-md">
        <q-btn
          color="primary"
          :dense="$q.screen.lt.md"
          :loading="submitLoading"
          @click="submit">
          {{ i18n('labels.submit') }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {useDialogPluginComponent} from "quasar";
import {computed, defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  name: "CropperDialog",
  props: {
    modelValue: {
      type: String,
      required: true
    },
    submitCallback: {
      type: Function,
      required: true
    }
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    const cropper = {
      style: {
        height: "30vh",
        maxHeight: "800px",
      },
      size: 100,
      outputType: "png",
    };
    const file = ref(null);
    const image = ref(props.modelValue);
    const realTimeData = ref({
      url: null,
      img: null,
      w: 0,
      h: 0,
    });
    const previewStyle = ref({
      width: computed(() => `${realTimeData.value.w}px`),
      height: computed(() => `${realTimeData.value.h}px`),
      overflow: "hidden",
      zoom: 1,
    });
    const submitLoading = ref(false);
    return {
      dialogRef,
      onDialogHide,
      cropper,
      file,
      image,
      realTimeData,
      previewStyle,
      submitLoading
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("components.cropperDialog." + relativePath);
    },
    realTime(data) {
      this.realTimeData = data;
    },
    imgLoad(msg) {
      if (msg !== "success") {
        this.$q.notify({
          color: 'amber',
          textColor: 'white',
          icon: 'warning',
          message: this.i18n("notifications.uploadFailed")
        });
      }
    },
    updateImage() {
      if (this.file === null) {
        this.img = this.modelValue;
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
        let imageData;
        if (typeof event.target.result === "object") {
          imageData = window.URL.createObjectURL(new Blob([event.target.result]));
        } else {
          imageData = event.target.result;
        }
        this.img = imageData;
      };
      reader.readAsArrayBuffer(this.file);
    },
    submit() {
      this.submitLoading = true;
      this.$refs.cropper.getCropData(data => this.submitCallback(data));
      this.submitLoading = false;
      this.hide();
    },
  }
});
</script>

<style scoped>

</style>
