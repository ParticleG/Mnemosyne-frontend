<template>
  <q-page class="flex flex-center row">
    <div class="col-8 column q-gutter-xl">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="text-center text-h1 text-weight-regular">
          {{ i18n("labels.title") }}
        </div>
        <div>
          {{ searchTest }}
        </div>
        <q-input
          name="searchText"
          clearable
          debounce="1000"
          outlined
          :placeholder="i18n('labels.placeholder')"
          rounded
          v-model="searchTest">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: "HomePage",
  setup() {
    const searchTest = ref("");

    return {
      searchTest
    };
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.main.homepage." + relativePath);
    },
    onSubmit(event) {
      const formData = new FormData(event.target);
      const data = [];

      for (const [name, value] of formData.entries()) {
        data.push({
          name,
          value
        })
      }
      console.log(data);
    }
  }
});
</script>

<style scoped>

</style>
