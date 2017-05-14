<template>

    <main class="app-body">

      <app-header :credits="user.credits"></app-header>
      
      <h1>Profile</h1>
      <p>Vorname: {{ user.first_name }}</p>
      <p>Nachname: {{ user.last_name }}</p>
      <p>Spitzname: {{ user.nick_name }}</p>

      <button type="button" class="btn btn--facebook">
        Connect with Facebook
      </button>
      

      <button type="button" class="btn btn--logout" @click="logout">
        Logout
      </button>

    </main>

</template>

<script>
  import * as AppHeader from '../components/Header'
  import storage from './../storage'
  import auth from './../auth'

  export default {
    name: 'profile',
    components: {
      'app-header': AppHeader,
    },
    data() {
      return {
        user: storage.getProfile()
      }
    },
    beforeCreate() {
      storage.updateProfile()
    },
    methods: {
      logout() {
          auth.logout()
      },
    }
  };
</script>