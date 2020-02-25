<template>
    <div class="sidebar">
        <Logo />
        <div class="links">
            <div v-if="$root.$data.domain">
                <div class="title">Currently editing:</div>
                <div class="info"><a :href="$root.$data.domain | safeURL" target="_blank">{{ $root.$data.domain | safeURL }}</a></div>
            </div>
            <div class="title">Manage</div>
            <router-link class="dashboard-link" to="/app">Dashboard</router-link>
            <router-link to="/app/domains">Domains</router-link>
            <router-link to="/app/themes">Themes</router-link>
            <div class="title">Write</div>
            <router-link to="/app/posts">Posts</router-link>
            <router-link to="/app/pages">Pages</router-link>
            <div class="logout" @click="logout">Logout</div>
        </div>
    </div>
</template>

<script>
    import Logo from '@/component/Logo';
    import api from '@/service/safe/api';

    export default {
        name: 'sidebar',
        components: {
            Logo
        },
        methods: {
            logout: function() {
                let parent = this;

                api.logout().then(function() {
                    parent.$root.$data.authenticated = false;
                    parent.$router.push("/");
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .sidebar {
        position: fixed;
        display: inline-block;
        top: 0;
        left: 0;
        width: 240px;
        color: #000;
        background-color: #fff;
        box-shadow: 0 0 5px #ddd;
        min-height: 100vh;

        .logo {
            margin: 20px 20px 0;
        }

        .title {
            padding: 20px 0 5px 0;
            opacity: .7;
            text-transform: uppercase;
            font-size: 11px;
            font-weight: bold;
        }

        .links {
            padding: 20px 20px 0;

            a, .logout {
                display: block;
                margin: 2px 0;
                padding: 5px 0 5px 10px;
                color: #000;
                font-weight: bold;
                text-decoration: none;
                overflow: hidden;
                word-break: break-all;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;

                &.router-link-active:not(.dashboard-link), &.router-link-exact-active, &:hover {
                    color: #54308a;
                    background-color: #f2f5f6;
                    border-radius: 5px;
                }
            }
        }

        .info a {
            color: #54308a;
            font-weight: bold;
            text-decoration: underline;
        }
    }
</style>