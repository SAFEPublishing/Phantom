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
        width: 100%;
        margin: 30px 0;
        border-collapse: collapse;
        border-spacing: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px #ddd;
        overflow: hidden;

        thead {
            color: #e9e3ef;
            background-color: #361f57;
        }

        tbody {
            background-color: #fff;
        }

        th, td {
            text-align: left;
            border-spacing: 0;
        }

        th {
            padding: 10px 20px;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
        }

        td {
            padding: 15px 20px;
            border-top: 1px solid #e6e6e6;
        }
    }
</style>
