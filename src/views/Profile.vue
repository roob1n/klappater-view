<template>

    <main class="app-body">

      <app-header></app-header>
      
      <h2>Profile</h2>
      <p v-show="user.first_name">Vorname: {{ user.first_name }}</p>
      <p v-show="user.last_name">Nachname: {{ user.last_name }}</p>
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
    computed: {
      user() {
        return storage.state.profile
      }
    },
    created() {
      storage.dispatch('updateProfile')
    },
    methods: {
      logout() {
          auth.logout()
      },
    }
  }
</script>