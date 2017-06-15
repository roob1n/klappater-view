import router from './../router'
import moment from 'moment'
import store from 'store'
import DataService from './../dataservice'
import storage from './../storage'

let dataservice = new DataService()

export default {
	
	user : {
		authenticated: false
	},

	register(code) {
		dataservice.register(code)
		.then((response) => {
			store.set('user_token', response.data.token)
			store.set('spotify_token', response.data.data.spotify_token)
			this.user.authenticated = true
			storage.profile = response.data.data
			router.replace('/profile')
		})
		.catch(function (error) {
			console.log(error)
		})
	},

	logout() {
		store.remove('user_token')
		this.user.authenticated = false
		router.push('/')
	},

	checkAuth() {
		if(store.get('user_token')) {
			this.user.authenticated = true
		}else {
			this.user.authenticated = false
		}
	},

	setSpotifyToken(token) {
		store.set('spotify_token', token)
	},

	getAuthHeader() {
		return {
			'Authorization': 'Bearer ' + store.get('user_token')
		}
	},

	getSpotifyHeader() {
		return {
			'Authorization': 'Bearer ' + store.get('spotify_token')
		}
	}
}