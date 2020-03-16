<template>
    <div class="home-wrapper">
        <div class="docs-sidebar">
            <router-link v-for="page in pages" :key="page.link" :to="'/docs' + page.link" :class="page.class">{{ page.title }}</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'docs-wrapper',
        data() {
            return {
                pages: [
                    { link: '', title: 'Phantom Docs', class: '' },
                    { link: '/themes', title: 'Themes', class: '' },
                    { link: '/themes/manifest', title: 'Theme Manifests', class: '' },
                    { link: '', title: 'Theme ', class: '' }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .home-wrapper {
        margin-top: 40px;
    }

    /deep/ .docs  {
        background-color: red;
    }
</style>