import Vue from 'vue'
import Router from 'vue-router'
import Home from './view/Home.vue'
import Dashboard from './view/Dashboard.vue'
import Domains from './view/Domains.vue'
import DomainCreate from './view/DomainCreate.vue'
import Posts from './view/Posts.vue'
import PostEdit from './view/PostEdit.vue'
import Themes from './view/Themes.vue'

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
            component: Home,
            meta: loggedOut
        },
        {
            path: '/app/domains',
            component: Domains,
            meta: loggedIn
        },
        {
            path: '/app/domains/create',
            component: DomainCreate,
            meta: loggedIn
        },
        {
            path: '/app',
            component: Dashboard,
            meta: hasDomain,
        },
        {
            path: '/app/themes',
            component: Themes,
            meta: hasDomain
        },
        {
            path: '/app/posts',
            component: Posts,
            meta: hasDomain,
        },
        {
            path: '/app/post/:file',
            component: PostEdit,
            meta: hasDomain,
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
