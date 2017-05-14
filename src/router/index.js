import Vue from 'vue';
import Router from 'vue-router';
import Checkin from '@/views/Checkin';
import Search from '@/views/Search';
import Charts from '@/views/Charts';
import Profile from '@/views/Profile';

Vue.use(Router);

export default new Router({
	linkActiveClass: 'active',

	routes: [
	{
		path: '/',
		name: 'Checkin',
		component: Checkin,
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
	},
	{
		path: '/charts',
		name: 'Charts',
		component: Charts,
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
	},
	],

});