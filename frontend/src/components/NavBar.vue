<template>
  <nav class="navbar sticky-top navbar-expand-md" aria-label="navbar">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="/tuk_logo.gif" height=40 width=50 alt="T:UK" border="0" />
        <img src="/banner_logo.png" height=40 width=189 alt="T:UK" border="0" />
      </router-link>
      <button class="navbar-toggler navbar-light bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav ms-auto mb-2 mb-sm-0">
          <li>
            <form class="d-flex">
              <input class="form-control" type="text" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">&#x1F50D;</button>
            </form>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link" aria-current="page">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="http://trigpointing.uk/wiki/" tabindex="-1" aria-disabled="true">Wiki</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="http://trigpointing.uk/forum/viewforum.php?f=4" tabindex="-1" aria-disabled="true">Forum</a>
          </li>
          <li v-if="isAuthenticated && user" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img
              :src="user.picture"
              alt="User's profile picture"
              class="nav-user-profile rounded-circle"
              width="40">
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown">
              <li><span class="dropdown-item disabled">{{ user.email }}</span></li>
              <li><a class="dropdown-item" href="#">Action</a></li>
              <!-- <li><router-link to="/preferences" class="dropdown-item">Preferences</router-link></li> -->
              <li><router-link to="/profile" class="dropdown-item">Profile</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" id="qsLogoutBtn" href="#" @click.prevent="logoutAndRedirect">Logout</a></li>
            </ul>
          </li>
          <li v-if="!isAuthenticated && !loading">
            <button
              id="qsLoginBtn"
              class="btn btn-primary btn-margin"
              @click.prevent="login"
            >Login</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@/auth/useAuthService';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "NavBar",
  setup() {
    const {loginWithRedirect, logout, isAuthenticated, loading, user} = useAuth();
    const {push} = useRouter();

    const logoutAndRedirect = () => {
      logout();
      push({ path: "/" });
    }

    const login = () => loginWithRedirect();

    return {login, logoutAndRedirect, isAuthenticated, loading, user}

  },
})
</script>


<style scoped>
.navbar {
  min-height: 50px;
  background-color:rgb(0, 95, 0);
}
.nav-link {
  font-weight: bold;
  color: rgb(255, 255, 255);
}

.nav-link:hover {
  font-weight: bolder;
  color: rgb(91, 247, 59);
}

a.router-link-active.router-link-exact-active.nav-link {
  color: rgb(43, 255, 0);
}
.dropdown-toggle {
  padding: 0px;
}

</style>

