<template>
    <div class="sidebar">
        <div class="logo">Phantom</div>
        <div class="links">
            <div class="title">Manage</div>
            <router-link to="/app">Dashboard</router-link>
            <router-link to="/domains">Domains</router-link>
            <router-link to="/theme">Themes</router-link>
            <div class="title">Write</div>
            <router-link to="/posts">Posts</router-link>
            <router-link to="/pages">Pages</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar'
    }
</script>

<style lang="scss">
    .sidebar {
        display: inline-block;
        width: 240px;
        color: #fff;
        background-color: #361f57;
        min-height: 100vh;

        .logo, .links {
            padding: 20px 10px 0;
        }

        .logo {
            font-size: 20px;
            font-weight: 500;
        }

        .title {
            padding: 20px 0 5px 0;
            opacity: .7;
            text-transform: uppercase;
            font-size: 11px;
        }

        .links a {
            display: block;
            padding: 5px 0 5px 10px;
            color: #fff;
            text-decoration: none;
        }

        .links a.router-link-active {
            background-color: #2a1646;
            border-radius: 5px;
        }
    }
</style>