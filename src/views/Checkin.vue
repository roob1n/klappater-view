<template>

  <main class="app-body checkin-view">

    <img class="checkin-view__logo" src="../assets/logo.png" />

    <h1>Check In</h1>

    <form @submit.prevent="onSubmit" accept-charset="utf-8">
      <label for="activation_code" class="lbl">
        Gib deinen Code hier ein:
      </label>

      <input type="text" name="activation_code" placeholder="" class="ipt ipt--big" maxlength="8" autocomplete="off" v-model="activation_code" />

      <button type="submit" :disabled="activation_code.length < 8" name="submit" class="btn btn--big">Einchecken</button>

    </form>

  </main>

</template>

<script>
  import auth from './../auth'
  import storage from './../storage'

  export default {
    name: 'check-in',
    data() {
      return {
        activation_code: ''
      }
    },
    methods: {
      onSubmit() {
        auth.register(this.activation_code)
      },
    }
  }
</script>