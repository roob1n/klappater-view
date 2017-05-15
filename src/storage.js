import DataService from './dataservice'
import auth from './auth'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let dataservice = new DataService()

var storage = new Vuex.Store({
	state: {
		profile: {
			credits: 0
		},
		suggestions: {},
		searchresult: {},
	},
	mutations: {
		updateProfile(state, profile) {
			state.profile = profile
		},
		updateSuggestions(state, suggestions) {
			state.suggestions = suggestions
		},
		toggleVote(state, votedId) {
			state.suggestions = state.suggestions.map((suggestion) => {
				if(suggestion.id == votedId) {
					if(!suggestion.has_user_vote) {
						suggestion.has_user_vote = true
						suggestion.votes++
					}else {
						suggestion.has_user_vote = false
						suggestion.votes--
					}
				}
				return suggestion
			})
		},
		decrementCredits(state) {
			state.profile.credits--
		}
	},
	actions: {
		updateSuggestions({commit}) {
			dataservice.getSuggestions({ headers: auth.getAuthHeader() })
			.then((response) => {
				commit('updateSuggestions', response.data)
			})
			.catch((error) => {
				console.log(error)
			})
		},

		updateProfile({commit}) {
			dataservice.getProfile({ headers: auth.getAuthHeader() })
			.then((response) => {
				commit('updateProfile', response.data)
			})
			.catch((error) => {
				console.log(error)
			})
		},
		addSuggestion({commit}, song) {

			let body = {
				spotify_song_id: song.id,
				title: song.name,
				artist: song.artists.map(function(artist) { return artist.name }).join(", "),
				img_url: song.album.images[2].url,
				duration_ms: song.duration_ms
			}

			dataservice.addSong(body, { headers: auth.getAuthHeader() })
			.then((response) => {
				dataservice.addSuggestion(response.data.id, { headers: auth.getAuthHeader() })
				.then((response) => {
					commit('decrementCredits')
					console.log('Suggestion added, bruh!')
				})
				.catch((error) => {
					console.log(error)
				})
			})
			.catch((error) => {
				console.log(error)
			})
		},

		toggleVote({commit}, suggestionId) {
			commit('toggleVote', suggestionId)

			dataservice.voteSuggestion(suggestionId, { headers: auth.getAuthHeader() })
			.catch((error) => {
				commit('toggleVote', suggestionId)
				console.log(error)
			})
		}
	}
})

export default storage