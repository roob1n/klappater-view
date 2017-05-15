<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
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
