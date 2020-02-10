<template>
    <div class="root">
        <div class="app" v-if="$root.$data.authenticated">
            <Sidebar />
            <div class="content">
                <router-view/>
            </div>
        </div>
        <div class="home" v-if="!$root.$data.authenticated">
            <div class="menu">
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link href="/login">Login</router-link>
            </div>
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from '@/component/Sidebar.vue';
    import api from '@/service/safe/api';

    export default {
        name: 'app',
        components: {
            Sidebar,
        },
        mounted: function () {
            api.authenticate().then(response => {
                this.$root.$data.authenticated = response;

                if (response) {

                }
            });
        },
    }
</script>

<style lang="scss">
    // The styles contained here are unscoped and will apply globally to components

    .app .content {
        padding: 40px 40px 40px 280px;
    }

    table {
        margin: 20px 0;

        th, td {
            text-align: left;
        }
    }
</style>
