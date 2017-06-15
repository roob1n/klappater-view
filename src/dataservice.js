import axios from 'axios'
import * as conf from './conf.json'

class DataService {

  constructor () {
    this.api = axios.create({
      baseURL: conf.apiurl,
      timeout: 30000,
    })
    this.spotify = axios.create({
    	baseURL: conf.spotifyurl,
    	timeout: 30000,
    })
  }

  register (code) {
    return this.api.post('/register/'+code)
  }

  getProfile(headers) {
  	return this.api.get('/profile', headers)
  }

  getLocation(headers) {
    return this.api.get('/location', headers)
  }

  addName(data, headers) {
    return this.api.post('/profile/name', data, headers)
  }

  addEmail(data, headers) {
    return this.api.post('/profile/email', data, headers)
  }

  changeNickname(data, headers) {
    return this.api.put('/profile/nickname', data, headers)
  }

  addSong(data, headers) {
  	return this.api.post('/songs', data, headers)
  }

  addSuggestion(songId, headers) {
  	return this.api.post('/suggestions/'+songId, null, headers)
  }

  getSuggestions(headers) {
  	return this.api.get('/suggestions', headers)
  } 

  voteSuggestion(suggestionId, headers) {
  	return this.api.post('/votes/'+suggestionId, null, headers)
  }
}

export default DataService