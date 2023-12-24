<script setup>
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import { openmodels } from './openmodels'

const session = ref()

onMounted(() => {
  openmodels.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  openmodels.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>