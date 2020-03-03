Vue.use(VueRouter);

window.routes = [{
    path: "/",
    component: Vue.component("home", { template: "#postList" })
}];

var types = ['post', 'page'];
for (var t = 0; t < types.length; t++) {
    var typeData = types[t] + 's';

    for (var i = 0; i < window[typeData].length; i++) {
        window.routes.push({
            path: window[typeData][i].path,
            component: Vue.component(window[typeData][i].path, {
                template: '<div class="' + types[i] + '">' + window[typeData][i].template + '</div>'
            })
        });
    }
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
            blogName: window.blogName,
            themeConfig: window.themeConfig
        }
    },
    template: '#menu'
});

Vue.component('Content', {
    template: '#content',
    data() {
        return {
            themeConfig: window.themeConfig
        }
    }
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
