import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from '@/service/safe/api';

const data = {
	initialized: false,
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

Vue.filter('timeAgo', function(value) {
	let minute = 60,
		hour = 3600,
		day = 86400,
		month = 2592000,
		year = 31536000,
		elapsed = Math.floor((Date.now() - new Date(value)) / 1000);

	if (elapsed < minute) {
		return 'just now';
	}

	let a = elapsed < hour  && [Math.floor(elapsed / minute), 'minute'] ||
		elapsed < day   && [Math.floor(elapsed / hour), 'hour']     ||
		elapsed < month && [Math.floor(elapsed / day), 'day']       ||
		elapsed < year  && [Math.floor(elapsed / month), 'month']   ||
		[Math.floor(elapsed / year), 'year'];

	return a[0] + ' ' + a[1] + (a[0] === 1 ? '' : 's') + " ago";
});

ArrayBuffer.prototype.toString = function() {
	let decoder = new TextDecoder();
	return decoder.decode(this);
};

String.prototype.toBuffer = function()  {
	let encoder = new TextEncoder();
	return encoder.encode(this.valueOf());
};

Vue.config.productionTip = false;

new Vue({
	router,
	data: data,
	render: h => h(App),
	created: function() {
		api.authenticate().then(response => {
			this.$root.$data.authenticated = true;

			api.getCurrentDomain().then(domain => {
				this.$root.$data.domain = domain;
			});
		});
	}
}).$mount('#app')
