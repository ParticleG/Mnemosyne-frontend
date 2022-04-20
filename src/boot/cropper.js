import {boot} from "quasar/wrappers";
import {VueCropper} from "vue-cropper";

export default boot(({app}) => {
  app.use(VueCropper);
})
