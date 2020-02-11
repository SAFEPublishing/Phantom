import Vue from 'vue'
import Router from 'vue-router'
import Home from './view/Home.vue'
import Dashboard from './view/Dashboard.vue'
import Domains from './view/Domains.vue'
import DomainCreate from './view/DomainCreate.vue'

Vue.use(Router);

let loggedIn = { authenticated: true },
    loggedOut = { authenticated: false },
    hasDomain = { authenticated: true, domain: true };

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: loggedOut
        },
        {
            path: '/app/domains',
            name: 'domains',
            component: Domains,
            meta: loggedIn
        },
        {
            path: '/app/domains/create',
            name: 'domains-create',
            component: DomainCreate,
            meta: loggedIn
        },
        {
            path: '/app',
            name: 'dashboard',
            component: Dashboard,
            meta: hasDomain,
            children: [

            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
