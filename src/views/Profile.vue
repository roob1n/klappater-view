<template>

  <main class="app-body">

    <h2>Profile</h2>
    <p v-show="user.first_name">Vorname: {{ user.first_name }}</p>
    <p v-show="user.last_name">Nachname: {{ user.last_name }}</p>
    <p v-show="user.email">E-Mail-Adresse: {{ user.email }}</p>
    <p>
      <span v-show="!nickname_change">Spitzname: {{ user.nick_name }}</span>
      <input v-show="nickname_change" type="text" class="ipt ipt--change" v-model="nickname">
      <button v-show="user.email || user.first_name" class="btn btn--change" @click="changenickname">{{ change_button_text }}</button>
    </p>

    <button type="button" class="btn btn--facebook" @click="fbconnect">
      {{ facebook_button_text }}
    </button>

    <div v-if="!user.email">
      <button type="button" :disabled="!(email_address.indexOf('@') > -1) && email_add_address" class="btn btn--email" @click="addemail" >
        {{ add_email_text }}
      </button>

      <input v-show="email_add_address" type="email" class="ipt ipt--email" autocomplete="off" v-model="email_address">
    </div>

    <button type="button" class="btn btn--logout" @click="logout">
      Logout
    </button>

  </main>

</template>

<script>
  import storage from './../storage'
  import auth from './../auth'
  import * as conf from './../conf.json'

  export default {
    name: 'profile',
    data() {
      return {
        facebook_button_text : "Mit Facebook einloggen",
        add_email_text : "E-Mail-Adresse hinzufügen",
        email_add_address : false,
        fb_has_conection : false,
        email_address : '',
        change_button_text : 'Ändern',
        nickname_change : false,
        nickname: ''
      }
    },
    computed: {
      user() {
        return storage.state.profile
      }
    },
    created() {

      window.fbAsyncInit = function() {
        FB.init({
          appId            : '1420513777994905',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.9'
        });
        FB.AppEvents.logPageView();
      };

      (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

      storage.dispatch('updateProfile');

      this.nickname = this.user.nick_name
    },
    methods: {
      logout() {
        auth.logout()
      },
      fbconnect() {
        // Wenn noch nicht verbunden
        if(!this.fb_has_conection) {
          this.facebook_button_text = "Verbinde mit deinem Facebook-Konto"

          FB.login((response) => {
            this.fbCallback(response);

            if (response.status === 'connected') {
              this.fb_has_conection = true

              FB.api('/me', (response) => {
                this.facebook_button_text = "Verbunden mit "+response.name
                storage.dispatch('updateName', response.name)
              })

            } else {
              this.facebook_button_text = "Verbindung fehlgeschlagen"
            }

          })
        }else {
          // Wenn verbunden: Logout
          this.facebook_button_text = "Trenne mit deinem Facebook-Konto..."

          this.fb_has_conection = false

          setTimeout(() => {this.facebook_button_text = "Mit Facebook einloggen"}, 1000)
        }
      },
      fbCallback(response) {

        console.log(response)

      },
      addemail() {
        if(!this.email_add_address) {

          this.add_email_text = "E-Mail Adresse eintragen"
          this.email_add_address = true

        }else {
          storage.dispatch('updateEmail', this.email_address)
        }
      },
      changenickname() {
       
        if(this.nickname_change) {
           // es wird gespeichert
           console.log(this.nickname)

          storage.dispatch('updateNickname', this.nickname)

          this.change_button_text = "Ändern"

          this.nickname_change = false

        }else {
          // es wird erfasst
          this.nickname = this.user.nick_name

          this.change_button_text = "Speichern"

          this.nickname_change = true
        }
      }
    }
  }
</script>