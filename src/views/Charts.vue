<template>

  <main class="app-body">

    <app-header></app-header>

    <h2>Charts</h2>
    
    <ul class="charts-list" v-if="charts.length > 0">
    <li v-for="item in charts" class="charts-entry song">
        <div class="song__info">
          <span class="song__title">{{ item.song.title }}</span>
          <span class="song__artist">{{ item.song.artist }}</span>
          <span class="song__suggestor">vorgeschlagen von {{ item.suggestor }}</span>
        </div>
        <button class="song__action-btn" @click="vote(item.id)">
          <i class="fa fa-volume-up"></i>
          <span>{{ item.votes }}</span>
        </button>
      </li>
    </ul>

  </main>

</template>

<script>  
  import * as AppHeader from '../components/Header'
  import storage from './../storage'

  export default {
    name: 'charts',
    components: {
      'app-header': AppHeader,
    },
    data() {
      return {
        charts: [{
          id: 1,
          song: {
            title: 'Sabotage', 
            artist: 'Beasty Boys'
          },
          votes: 194,
          suggestor: 'Salamander92'
        }, 
        {
          id: 2,
          song: {
            title: 'Reset After All', 
            artist: 'Shaka Poink'
          },
          votes: 15,
          suggestor: 'Texas95'
        },
        {
          id: 3,
          song: {
            title: 'Wahre Werte', 
            artist: 'Frei.Wild'
          },
          votes: 2,
          suggestor: 'Hdnw1888'
        },
        {
          id: 4,
          song: {
            title: 'Miles Away (Johnny Vicious Club Mix)', 
            artist: 'Madonna'
          },
          votes: 123,
          suggestor: 'Fäbschter88'
        }],
      };
    },
    methods: {
      vote(suggestionId) {
        storage.toggleVote(suggestionId)
      }
    }
  };
</script>