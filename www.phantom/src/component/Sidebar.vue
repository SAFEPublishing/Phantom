<template>
    <div>
        <div class="mobile-menu">
            <Logo />
            <Hamburger :click="toggleMenu" />
        </div>
        <div class="sidebar" :class="menuActive ? 'active' : ''">
            <Logo />
            <div class="links">
                <div v-if="$root.$data.domain">
                    <div class="title">{{ 'sidebar_editing' | t }}</div>
                    <div class="info"><a :href="$root.$data.domain | safeURL" target="_blank">{{ $root.$data.domain | safeURL }}</a></div>
                </div>
                <div class="title">{{ 'manage' | t }}</div>
                <router-link class="dashboard-link" to="/app" @click.native="toggleMenu">{{ 'dashboard' | t }}</router-link>
                <router-link to="/app/domains" @click.native="toggleMenu">{{ 'domains' | t }}</router-link>
                <router-link to="/app/themes" @click.native="toggleMenu">{{ 'themes' | t }}</router-link>
                <router-link to="/app/theme" v-if="$root.$data.themeHasConfig" @click.native="toggleMenu">{{ 'theme_config' | t }}</router-link>
                <div class="title">{{ 'write' | t }}</div>
                <router-link to="/app/posts" @click.native="toggleMenu">{{ 'posts' | t }}</router-link>
                <router-link to="/app/pages" @click.native="toggleMenu">{{ 'pages' | t }}</router-link>
                <div class="logout" @click="logout">{{ 'logout' | t }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from '@/component/Logo';
    import Hamburger from '@/component/Hamburger';
    import api from '@/service/safe/api';

    export default {
        name: 'sidebar',
        components: {
            Logo,
            Hamburger
        },
        data() {
            return {
                menuActive: false
            }
        },
        methods: {
            logout: function() {
                this.toggleMenu()
                let parent = this;

                api.logout().then(function() {
                    parent.$root.$data.authenticated = false;
                    parent.$router.push("/");
                });
            },
            toggleMenu: function() {
                this.menuActive = !this.menuActive;
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

    .close {
        display: none;
    }

    .mobile-menu {
        display: none;
    }

    @media (max-width: 767px) {
        .sidebar {
            top: 55px;
            left: -100vw;
            width: 100vw;
            height: calc(100vh - 55px);
            z-index: 250;
            box-shadow: none;
            overflow: auto;
            transition: 0.2s left;

            &.active {
                left: 0;
            }

            .logo {
                display: none;
            }

            .links {
                padding-top: 0;
            }
        }

        .mobile-menu {
            position: fixed;
            display: block;
            top: 0;
            left: 0;
            width: 100vw;
            height: 55px;
            background-color: #fff;
            z-index: 251;

            .logo {
                margin: 10px 10px 0;
            }

            .hamburger {
                margin: 16px 10px 0 0;
                float: right;
            }
        }
    }
</style>