<template>
	<header class="header" v-show="!($route.path==='/' )">
		<div class="status-bar">
			<span class="status-bar__location">
				<span class="status-bar__info">{{ location.location }}</span>
			</span>
			<span class="status-bar__credits">
				<span class="status-bar__info">credits&nbsp;</span>
				<i class="fa fa-volume-up"></i> 
				{{ credits }}
			</span>
		</div>
		<nav class="menu">
			<router-link to="/profile" class="menu__entry" exact>
				<i class="fa fa-user"></i>
				<span>Profil</span>
			</router-link>
			<router-link to="/charts" class="menu__entry" exact>
				<i class="fa fa-line-chart"></i>
				<span>Charts</span>
			</router-link>
			<router-link to="/search" class="menu__entry" exact>
				<i class="fa fa-search-plus"></i>
				<span>Vorschlagen</span>
			</router-link>
		</nav>
	</header>
</template>

<script>
	import storage from '@/storage'

	export default {
		name: 'app-header',
		computed: {
			credits() {
				return storage.state.profile.credits
			},
			location() {
				return storage.state.location
			},
			status_bar_info() {
				return this.infotext + this.location.name
			}
		},
		data() {
			return {
				infotext : "Laden..."
			}
		},
		created() {
			storage.dispatch('updateSuggestions')
			storage.dispatch('updateProfile')
			storage.dispatch('updateLocation')

			// profil alle 30 sekunden aktualisieren
			setInterval(() => {
				this.refreshProfile()
			}, 30000)

			// location und spotify-token alle 3 minuten aktualisieren
			setInterval(() => {
				this.refreshLocation()
			}, 3 * 60000)
		},
		mounted() {
			this.infotext = "Eingecheckt in "
		},
		methods: {
			refreshProfile() {
				console.log("Profil aktualisiert")
				storage.dispatch('updateProfile')
			},
			refreshLocation() {
				console.log("Spotify Token aktualisiert")
				storage.dispatch('updateLocation')
			}
		}
	}
</script>