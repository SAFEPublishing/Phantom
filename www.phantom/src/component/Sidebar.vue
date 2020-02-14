<template>
    <div class="sidebar">
        <div class="logo">Phantom</div>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar'
    }
</script>

<style lang="scss">
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
            position: relative;
            display: inline-block;
            margin: 20px 20px 0;
            font-size: 20px;
            font-weight: bold;

            &:before {
                position: absolute;
                display: inline-block;
                content: "Phantom";
                top: 3px;
                left: 3px;
                padding: 1px 9px;
                color: #fff;
                z-index: 2;
            }

            &:after {
                position: absolute;
                display: block;
                content: "";
                top: 0;
                left: 0;
                height: 35px;
                width: calc(100% + 24px);
                background: linear-gradient(145deg, #3ca6ce, #7a36c8, #c836a9);
                background-size: 400% 400%;
                animation: logoAnimation 4s ease-in-out infinite;
            }
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

            a {
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

    @keyframes logoAnimation {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
</style>