<template>
	<header class="header">
		<div class="status-bar">
			{{ headerTitle }}
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
	export default{
		data () {
			return {
				headerTitle: "Menu",
			}
		}
	}
</script>