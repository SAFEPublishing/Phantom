Vue.use(VueRouter);

window.routes = [{
    path: "/",
    component: Vue.component("home", { template: "#postList" })
}];

for (var i = 0; i < window.posts.length; i++) {
    window.routes.push({
        path: window.posts[i].path,
        component: Vue.component(window.posts[i].path, {
            template: '<div class="post">' + window.posts[i].template + '</div>'
        })
    });
}

var router = new VueRouter({
    mode: 'hash',
    routes: window.routes
});

window.menuItems = [
    {
        link: '/',
        text: 'Home'
    }
];

Vue.component('Menu', {
    data: {
        menuItems: window.menuItems,
        blogName: window.blogName
    },
    template: '#menu'
});

Vue.component('Content', {
    template: '#content'
});

new Vue({
    router,
    el: "#app",
    template: `
        <div class="root">
            <Menu />
            <Content />
        </div>
    `
});
