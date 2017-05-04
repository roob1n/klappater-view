<template>
  <main class="app-body">
    <ul class="charts-list" v-if="charts.length > 0">
    <li v-for="item in charts" class="charts-entry song">
        <div class="song__info">
          <span class="song__title">{{ item.song.title }}</span>
          <span class="song__artist">{{ item.song.artist }}</span>
        </div>
        <button class="song__action-btn">
          <i class="fa fa-volume-up"></i>
          <span>{{ item.votes }}</span>
        </button>
      </li>
    </ul>
  </main>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        charts: [{
          song: {
            title: 'Sabotage', 
            artist: 'Beasty Boys'
          },
          votes: 194
        }, {
          song: {
            title: 'Reset After All', 
            artist: 'Shaka Poink'
          },
          votes: 15
        }],
      };
    },
  };
</script>