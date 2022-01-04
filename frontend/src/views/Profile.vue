<template>
  <div class="container" v-if="user">
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3">
        <img
          :src="user.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md text-center text-md-left">
        <h2>{{ user.name }}</h2>
        <p class="lead text-muted">{{ user.email }}</p>
        <p class="lead text-muted">{{ user }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuth } from '@/auth/useAuthService'
import { defineComponent } from 'vue'

export default defineComponent({
  // async setup() {
  // const { user, getIdTokenClaims } = useAuth()
  // console.log('user')
  // console.log(user)
  // const tokens = await getIdTokenClaims()
  // console.log('tokens')
  // console.log(tokens)
  // console.log('tokens-end')
  // return { user, tokens }
  setup() {
    const { user } = useAuth()
    console.log('user')
    console.log(user)
    return { user }
  },
})
</script>
