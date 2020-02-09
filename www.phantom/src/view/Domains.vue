<template>
    <div>
        <PageTitleWithActions title="Domains" :actions="actions" />
        <Loader v-if="!domains" text="Loading domains from SAFE Network" />
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";

    export default {
        name: 'domains',
        components: {
            PageTitleWithActions,
            Loader
        },
        data: function() {
            return {
                domains: false,
                actions: [
                    { text: "Create domain", callback: this.openCreateDomainModal }
                ]
            }
        },
        methods: {
            openCreateDomainModal: function() {
                console.log('hi')
            }
        }
    }
</script>

<style scoped lang="scss">

</style>