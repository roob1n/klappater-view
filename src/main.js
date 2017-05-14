// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from '@/auth'

Vue.config.productionTip = false

require('font-awesome-sass-loader')
var store = require('store')

auth.checkAuth()

router.beforeEach(function (to, from, next) {

	  if (!auth.user.authenticated && to.path === '/') {
		    next()
	  }

	  if (auth.user.authenticated) {
		if(to.path === '/') {
			router.push('/profile')
		}else {
			    next()
		}
	  } else {
		    router.push('/')
	  }
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
})
