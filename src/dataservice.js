import axios from 'axios'
import * as conf from 'conf.json'

class DataService {

  constructor () {
    this.instance = axios.create({
      baseURL: conf.apiurl,
      timeout: 30000
    })
  }

  getAllPlayers () {
    return this.instance.get('/player')
  }

  getGames (page, limit) {
    return this.instance.get('/game?page=' + page + '&limit=' + limit)
  }

  getTopGames () {
    return this.instance.get('/games/top3')
  }

  getMostGames () {
    return this.instance.get('/games/frequent3')
  }

  makeGame (playerOneId, playerTwoId, winner, playerOneGoals, playerTwoGoals) {
    return this.instance.post('/game', {
      player_one_id: playerOneId,
      player_two_id: playerTwoId,
      winner: winner,
      player_one_goals: playerOneGoals,
      player_two_goals: playerTwoGoals
    })
  }

  destroyGame (gameId) {
    return this.instance.delete('/game/' + gameId)
  }

}

export default DataService
