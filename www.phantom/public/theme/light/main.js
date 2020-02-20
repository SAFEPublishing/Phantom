Vue.use(VueRouter);

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
        menuItems: window.menuItems
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
