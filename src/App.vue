<template>
	<div id="app">
		<app-header></app-header>
		<router-view></router-view>
	</div>
</template>

<script>
	import * as AppHeader from './components/Header'

	export default {
		name: 'app',
		components: {
			'app-header': AppHeader,
		}
	};
</script>

<style lang="scss">
	@import 'variables';
	@import 'app';
	@import './assets/scss/header';
	@import './assets/scss/forms';
	@import './assets/scss/search';
	@import './assets/scss/checkin';
	@import './assets/scss/profile';
	@import './assets/scss/charts';
</style>
