<template>
    <div>
        <PageTitleWithActions title="Theme Configuration" :actions="actions" />
        <Loader v-if="!theme" text="Loading theme from cache" />

    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import Modal from '@/component/Modal';
    import api from "@/service/safe/api";
    import Theme from "@/service/theme/theme";

    export default {
        name: 'theme',
        components: {
            PageTitleWithActions,
            Loader
        },
        data: function() {
            return {
                theme: false,
                actions: [
                    { text: "Save", callback: this.save }
                ]
            }
        },
        methods: {
            save: function() {

            }
        },
        mounted() {
            let parent = this;
            api.getTheme(this.$root.$data.domain).then(theme => {
                parent.theme = theme;
            });
        }
    }
</script>

<style scoped lang="scss">
</style>