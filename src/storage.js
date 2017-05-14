import DataService from './dataservice'
import auth from './auth'

let dataservice = new DataService()

var storage = {

	profile: {
		credits: 0
	},
	suggestions: {},
	searchresult: {},

	getProfile() {
		return this.profile
	},

	updateProfile() {
		dataservice.getProfile({ headers: auth.getAuthHeader() })
		.then((response) => {
			this.profile = response.data
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	},

	addSuggestion(song) {

		if(this.profile.credits <= 0) {
			console.log("Not enough credits!")
			return false
		}

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

	toggleVote(suggestionId) {
		dataservice.voteSuggestion(suggestionId, { headers: auth.getAuthHeader() })
		.then((response) => {
			console.log(response)
		})
		.catch((error) => {
			console.log(error)
		})
	}
}

export default storage