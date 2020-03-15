import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from '@/service/safe/api';
import importer from '@/service/theme/importer';
import phantomPluginTools from '@/service/plugin/phantom';
import en_GB from '@/i18n/en_GB';
import es_ES from '@/i18n/es_ES';
import nl_NL from '@/i18n/nl_NL';

window.phantom = phantomPluginTools;

let locales = {
	"en_GB": en_GB,
	"es_ES": es_ES,
	"nl_NL": nl_NL
};

let localeNames = {
	"en_GB": "English (UK)",
	"es_ES": "Español (ES)",
	"nl_NL": "Nederlands (NL)"
};

const data = {
	initialized: false,
	authenticated: false,
	domain: false,
	themeHasConfig: false,
	locale: "en_GB",
	localeNames: localeNames,
	localeTranslations: locales
};

// This is the only place we don't use the async safe libs, because without this data initial routing (with guards) is impossible
// So we hack in this data... then we verify
let tempAuth = localStorage.getItem("auth");
let tempNRS = localStorage.getItem("current-nrs");
let tempLocale = localStorage.getItem("locale");
data.authenticated = tempAuth ? !!JSON.parse(tempAuth).data : false;
data.domain = tempNRS ? JSON.parse(tempNRS).data : false;
data.locale = tempLocale ? tempLocale : data.locale;

/**
 * This function handles translating and outputting of text
 * If there is a locale code entry for the current text code it will output it, else it will default to English
 */
function translate(value, fallback) {
	if (locales.hasOwnProperty(data.locale) && typeof locales[data.locale][value] !== "undefined") {
		return locales[data.locale][value];
	}

	return typeof locales.en_GB[value] !== "undefined"
		? locales.en_GB[value]
		: (typeof(fallback) !== "undefined"
			? fallback
			: value);
}
Vue.filter('t', translate);
document.title = translate("home_heading");

router.beforeEach((to, from, next) => {
	// Should we show
	if (to.meta.hasOwnProperty('authenticated') && data.authenticated !== to.meta.authenticated) {
		return next(data.authenticated ? '/app' : '/');
	}

	if (to.meta.hasOwnProperty('domain') && to.meta.domain === true && data.domain === false) {
		return next('/app/domains');
	}

	next();
});

router.beforeResolve((to, from, next) => {
	if (data.authenticated) {
		// Preload our themes
		api.getInstalledThemes().then(async function(themes) {
			if (!themes.length) {
				let urls = ["/theme/zen/theme.json", "/theme/light/theme.json", "/theme/dark/theme.json"];

				for (let i = 0; i < urls.length; i++) {
					await importer.import(urls[i], data.localeTranslations, translate);
				}
			}

			if (data.domain) {
				api.getTheme(data.domain).then(theme => {
					data.themeHasConfig =
						typeof theme.config.config !== "undefined"
						&& Array.isArray(theme.config.config)
						&& theme.config.config.length;

					if (data.themeHasConfig && typeof theme.config.localeTranslations !== "undefined") {
						for (let locale in theme.config.localeTranslations) {
							if (theme.config.localeTranslations.hasOwnProperty(locale)) {
								if (typeof locales[locale] === "undefined") {
									locales[locale] = {};
								}

								for (let key in theme.config.localeTranslations[locale]) {
									if (theme.config.localeTranslations[locale].hasOwnProperty(key)) {
										if (typeof locales[locale][key] === "undefined") {
											locales[locale][key] = theme.config.localeTranslations[locale][key];
										}
									}
								}
							}
						}
					}
				});
			}
		});
	}

	next();
});

Vue.filter('safeURL', function (value) {
	return value.startsWith('safe://') ? value : "safe://" + value;
});

Vue.filter('idToReadableString', function (value) {
	return value.replace(/[\-_]+/, " ");
});

Vue.filter('timeAgo', function(value) {
	let minute = 60,
		hour = 3600,
		day = 86400,
		month = 2592000,
		year = 31536000,
		elapsed = Math.floor((Date.now() - new Date(value)) / 1000);

	if (elapsed < minute) {
		return translate('just_now');
	}

	let a = elapsed < hour  && [Math.floor(elapsed / minute), 'minute'] ||
		elapsed < day   && [Math.floor(elapsed / hour), 'hour']     ||
		elapsed < month && [Math.floor(elapsed / day), 'day']       ||
		elapsed < year  && [Math.floor(elapsed / month), 'month']   ||
		[Math.floor(elapsed / year), 'year'];

	let text = translate(a[1] + (a[0] === 1 ? '' : 's') + "_ago");
	return text.replace("[TIME]", a[0]);
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
		api.getAuthToken().then(token => {
			return !token ? false : api.authenticate(token).then(response => {
				this.$root.$data.authenticated = true;

				api.getCurrentDomain().then(domain => {
					this.$root.$data.domain = domain;
				});
			});
		});
	}
}).$mount('#app')
