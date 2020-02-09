import Vue from 'vue'
import App from './App.vue'
import router from './router'

const data = {
	// Once @joshuef fixes the SAFE browser authentication bugs, this should default to false
	authenticated: true,
	domain: false,
};

Vue.config.productionTip = false;

new Vue({
	router,
	data: data,
	render: h => h(App)
}).$mount('#app')
