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
  	console.log(headers)
  	return this.api.get('/profile', headers)
  }

  addSong(data, headers) {
	console.log(headers)
  	return this.api.post('/songs/', data, headers)
  }

  addSuggestion(songId, headers) {
  	console.log(headers)
  	return this.api.post('/suggestions/'+songId, null, headers)
  }

  getSuggestions(headers) {
  	console.log(headers)
  	return this.api.get('/suggestions/', headers)
  } 

  voteSuggestion(suggestionId, headers) {
  	console.log(headers)
  	return this.api.post('/votes/'+suggestionId, null, headers)
  }
}

export default DataService