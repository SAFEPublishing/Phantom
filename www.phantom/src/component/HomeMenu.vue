<template>
    <div class="home-wrapper">
        <router-link to="/">
            <Logo />
        </router-link>
        <div class="menu">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <div class="login button" @click="login">Login</div>
        </div>
    </div>
</template>

<script>
    import Logo from '@/component/Logo';
    import api from '@/service/safe/api';

    export default {
        name: 'home-menu',
        components: {
            Logo
        },
        methods: {
            login: function() {
                api.authenticate(false).then(response => {
                    this.$root.$data.authenticated = true;

                    api.getCurrentDomain().then(domain => {
                        this.$root.$data.domain = domain;
                        this.$router.push("/app");
                    });
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .home-wrapper {
        margin-top: 20px;
    }

    .logo, .menu {
        display: inline-block;
        vertical-align: top;
    }

    .logo {
        margin-top: 5px;
    }

    .menu {
        padding-bottom: 20px;
        float: right;

        a, .login {
            display: inline-block;
            vertical-align: middle;
            margin-left: 40px;
            font-weight: bold;
        }

        a {
            text-decoration: none;
            color: #000;

            &:hover {
                color: #54308a;
            }
        }

        .login {
        }
    }
</style>