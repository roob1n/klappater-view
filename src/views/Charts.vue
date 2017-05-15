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
        <button class="song__action-btn" :class="(item.has_user_vote) ? 'active' : ''" @click="vote(item.id)">
          <i class="fa fa-volume-up"></i>
          <span>{{ item.votes }}</span>
        </button>
      </li>
    </ul>

  </main>

</template>

<script>  
  import * as AppHeader from '@/components/Header'
  import storage from './../storage'

  export default {
    name: 'charts',
    components: {
      'app-header': AppHeader,
    },
    computed: {
      charts() {
        return storage.state.suggestions
      }
    },
    beforeCreate() {
        storage.dispatch('updateSuggestions')
    },
    methods: {
      vote(suggestionId) {
        storage.dispatch('toggleVote', suggestionId)
      }
    }
  }
</script>