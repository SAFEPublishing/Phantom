<template>
    <div>
        <PageTitleWithActions title="Domains" :actions="actions" />
        <Loader v-if="!domains" text="Loading domains from cache" />
        <table v-if="domains">
            <thead>
                <tr>
                    <th>Domain</th>
                    <th>Files Container</th>
                    <th>Updated At</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="domains && !domains.length">
                    <td colspan="4">You currently have no domains registered to this machine, please click "create domain" to get started</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import api from "@/service/safe/api";

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
        },
        mounted() {
            api.getDomains().then(domains => {
                this.domains = domains;
            });
        }
    }
</script>

<style scoped lang="scss">

</style>