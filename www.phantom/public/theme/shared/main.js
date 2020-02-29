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

window.menuItems = [];

if (typeof window.themeConfig['menu-items'] !== "undefined") {
    for (i = 0; i < window.themeConfig["menu-items"].length; i++) {
        window.menuItems.push({
            link: window.themeConfig['menu-items'][i].URL,
            text: window.themeConfig['menu-items'][i].Text
        });
    }
}

Vue.component('Menu', {
    data() {
        return {
            menuItems: window.menuItems,
            logo: typeof window.themeConfig.logo !== "undefined" ? window.themeConfig.logo.Image.xorurl : false,
            blogName: window.blogName
        }
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
