<template>

  <main class="app-body">

    <form @submit.prevent="onSubmit" class="search-form">
      <input type="text" name="search_query" placeholder="Suchen..." class="form-ipt" v-model="search_query" autofocus />
      <button type="submit" name="submit" class="form-btn">Suchen</button>
    </form>

    <ul class="search-results" id="search-results"  v-if="results.length > 0">
      <h2 class="search-results__title">Resultate</h2>
      
      <li class="search-result song" v-for="item in results">
        
        <img class="song__cover" :src="item.album.images[2].url" />

        <div class="song__info">
          <span class="song__title">{{ item.name }}</span>
          <span class="song__artist">{{ item.artists.map(function(artist) { return artist.name }).join(", ") }}</span>
          </div>

        <button @click="suggestSong(item, $event)" class="song__action-btn">
          <i class="fa fa-plus-circle"></i>
        </button>

      </li>

      <footer v-if="results.length >= (limit + offset)" class="search-results__footer">
        <button class="btn"  @click="showMoreResults">Mehr Anzeigen</button>
      </footer>

    </ul>

  </main>

</template>

<script>
  import * as conf from '../conf.json'
  import axios from 'axios'
  import storage from './../storage'

  export default {
    name: 'search',
    data() {
      return {
        search_query : '',
        query : '',
        offset: 0,
        limit: 10,
        results: []
      }
    },
    methods: {
      onSubmit() {
        this.offset = 0;
        if(this.search_query.length > 0) {
          this.query = this.search_query.replace(' ', '+');
          axios.get('https://api.spotify.com/v1/search?q='+this.query+'&type=track&limit='+this.limit+'&offset='+this.offset)
          .then(response => this.results = response.data.tracks.items);
          //.then(response => console.log(response));
        }
      },
      showMoreResults() {
        this.offset += 10;
        axios.get('https://api.spotify.com/v1/search?q='+this.query+'&type=track&limit='+this.limit+'&offset='+this.offset+'market=CH')
        .then(response => this.results = this.results.concat(response.data.tracks.items));
      },
      suggestSong(song, event) {
        if(event.target.className == "fa fa-plus-circle") {
          event.target.className = "fa fa-check";
        }

        if(storage.state.profile.credits <= 0) {
          console.log("Not enough credits!")
          return false
        }

        storage.dispatch('addSuggestion', song);
      }
    }
  };
</script>