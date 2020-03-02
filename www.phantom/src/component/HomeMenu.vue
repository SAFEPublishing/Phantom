<template>
    <div class="home-wrapper">
        <router-link to="/">
            <Logo />
        </router-link>
        <Hamburger :click="toggleMenu" />
        <div class="menu" v-if="showMenu">
            <router-link to="/" @click.native="hideMenuForMobile">Home</router-link>
            <router-link to="/about" @click.native="hideMenuForMobile">About</router-link>
            <div class="login button" @click="login">Login</div>
        </div>
    </div>
</template>

<script>
    import Logo from '@/component/Logo';
    import Hamburger from '@/component/Hamburger';
    import api from '@/service/safe/api';

    export default {
        name: 'home-menu',
        components: {
            Logo,
            Hamburger
        },
        methods: {
            login: function() {
                this.showMenu = window.outerWidth >= 768;

                api.authenticate(false).then(response => {
                    this.$root.$data.authenticated = true;

                    api.getCurrentDomain().then(domain => {
                        this.$root.$data.domain = domain;
                        this.$router.push("/app");
                    });
                });
            },
            toggleMenu: function() {
                this.showMenu = !this.showMenu;
            },
            hideMenuForMobile: function() {
                this.showMenu = window.outerWidth >= 768;
            }
        },
        data() {
            return {
                showMenu: true,
            }
        },
        mounted() {
            this.hideMenuForMobile()
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

    .hamburger {
        display: none;
    }

    @media (max-width: 767px) {
        .logo {
            margin: 0;
        }

        .home-wrapper {
            padding: 0 10px;
            margin-top: 10px;
            height: 45px;
        }

        .hamburger {
            display: inline-block;
            float: right;
            margin-top: 7px;
        }

        .menu {
            position: absolute;
            top: 45px;
            left: 0;
            width: 100%;
            padding: 10px;
            background-color: #f2f5f6;

            a {
                display: block;
                margin: 0;
                padding: 10px 0;
                font-size: 16px;
            }

            .login {
                display: block;
                margin: 0;
                text-align: center;
            }
        }
    }
</style>