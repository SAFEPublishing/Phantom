<template>
    <div>
        <PageTitleWithActions title="Themes" :actions="actions" />
        <Loader v-if="!themes" text="Loading themes from cache" />
        <div @click="compileTheme">This page is a work in progress</div>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import Light from '@/service/theme/light.json';
    import Theme from '@/service/theme/theme';
    import api from "@/service/safe/api";

    export default {
        name: 'themes',
        components: {
            PageTitleWithActions,
            Loader
        },
        data: function() {
            return {
                themes: [new Theme(Light)],
                actions: []
            }
        },
        methods: {
            compileTheme: function() {
                this.themes[0].getComputedTemplate().then(template => {
                    console.log(template);
                });
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">

</style>