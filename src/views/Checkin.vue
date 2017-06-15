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
    mounted() {
      this.activation_code = this.getQueryVariable("c");
      if(! this.activation_code) {
        this.activation_code = "";
      }
    },
    methods: {
      onSubmit() {
        auth.register(this.activation_code)
      },
      getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){
              return pair[1];
            }
        }
        return(false);
      }
    }
  }
</script>