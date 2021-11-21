<template>
   <div id="app">
    <nav-bar />
    <div class="container-xxl">
      <error />
      <div class="mt-0">
        <router-view />
      </div>
    </div>
    <tuk-footer />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import {useAuth} from '@/auth/useAuthService'
import NavBar from '@/components/NavBar.vue'
import TukFooter from '@/components/TukFooter.vue'
import Error from '@/components/Error.vue'

export default defineComponent({
  components: {       
    NavBar,
    TukFooter,
    Error
  },
  setup() {
    // You can import 'loading' here and show a global loader if that's more convenient 
    const { initializeAuth } = useAuth();
    onMounted(() =>
      initializeAuth({
        domain: process.env.VUE_APP_AUTH0_DOMAIN as string,
        client_id: process.env.VUE_APP_AUTH0_CLIENTID as string,
        audience: process.env.VUE_APP_AUTH0_AUDIENCE as string,
        scope: 'openid profile email'
      })
    );
  },
})
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
