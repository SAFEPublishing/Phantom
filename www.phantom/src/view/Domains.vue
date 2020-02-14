<template>
    <div>
        <PageTitleWithActions title="Domains" :actions="actions" />
        <Loader v-if="!domains" text="Loading domains from cache" />
        <table v-if="domains">
            <thead>
                <tr>
                    <th>NRS Name</th>
                    <th>Files Container</th>
                    <th>Updated</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="domains && !domains.length">
                    <td colspan="5">You currently have no domains registered to this machine, please click "create domain" to get started</td>
                </tr>
                <tr v-for="domain in domains">
                    <td><a :href="domain.publicName | safeURL" target="_blank">{{ domain.publicName | safeURL }}</a></td>
                    <td>{{ domain.filesContainer | safeURL }}</td>
                    <td>{{ domain.modified | timeAgo }}</td>
                    <td>{{ domain.created | timeAgo }}</td>
                    <td>
                        <div class="button" @click="useDomain(domain.publicName)" v-if="domain.publicName !== $root.$data.domain">Use</div>
                    </td>
                </tr>
                <tr v-if="domains && domains.length && !$root.$data.domain">
                    <td colspan="5">Please select a domain from the list above to begin editing your website</td>
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
                    { text: "Create domain", callback: this.createDomain }
                ]
            }
        },
        methods: {
            createDomain: function() {
                this.$router.push("#/app/domains/create");
            },
            useDomain: function(publicName) {
                api.setCurrentDomain(publicName).then(response => {
                    this.$root.$data.domain = publicName;
                    this.$router.push("/app/posts");
                });
            }
        },
        mounted() {
            api.getDomains().then(domains => {
                let domainData = [];

                for (let i = 0; i < domains.length; i ++) {
                    let domain = {};

                    for (let key in domains[i][1]) {
                        if (domains[i][1].hasOwnProperty(key) && domains[i][1][key][1].startsWith(domains[i][0])) {
                            domain.filesContainer = domains[i][1][key][1];
                            domain.publicName = key;
                        }
                    }

                    domain.created = domains[i][2].default.OtherRdf.created;
                    domain.modified = domains[i][2].default.OtherRdf.modified;
                    domainData.push(domain);
                }

                this.domains = domainData;
            });
        }
    }
</script>

<style scoped lang="scss">

</style>