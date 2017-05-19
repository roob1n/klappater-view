<template>
	<header class="header" v-show="!($route.path==='/' )">
		<div class="status-bar">
			<span class="status-bar__credits">
				<span class="status-bar__info">Credits:&nbsp;</span>
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
			}
		}
	}
</script>