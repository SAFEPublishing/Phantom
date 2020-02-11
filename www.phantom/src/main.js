import Vue from 'vue'
import App from './App.vue'
import router from './router'

const data = {
	// Once @joshuef fixes the SAFE browser authentication bugs, this should default to false
	authenticated: true,
	domain: false,
};

router.beforeEach((to, from, next) => {
	if (to.meta.hasOwnProperty('authenticated') && data.authenticated !== to.meta.authenticated) {
		return next(data.authenticated ? '/app' : '/');
	}

	if (to.meta.hasOwnProperty('domain') && to.meta.domain === true && data.domain === false) {
		return next('/app/domains');
	}

	next();
});

Vue.filter('safeURL', function (value) {
	return value.startsWith('safe://') ? value : "safe://" + value;
});

Vue.config.productionTip = false;

new Vue({
	router,
	data: data,
	render: h => h(App)
}).$mount('#app')
