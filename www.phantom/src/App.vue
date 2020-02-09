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

    export default {
        name: 'app',
        components: {
            Sidebar,
        },
    }
</script>

<style lang="scss">

</style>
