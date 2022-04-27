<template>
  <q-layout class="hide-scrollbar" :view="layout.now">
    <router-view name="header"/>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      layout: {
        now: 'hHh lpR fFf',
        views: [
          'lhh lpR fFf',
          'lhh lpR fFf',
          'lHh lpR fFf',
          'lHh lpR fFf',
        ]
      },
      drawer: {
        active: ref(false),
      },
    }
  }
})
</script>
