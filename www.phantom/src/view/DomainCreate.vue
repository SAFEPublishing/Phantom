<template>
    <div>
        <PageTitleWithActions :title="'create_domain' | t" />
        <form class="default" @submit="createDomain">
            <div class="group">
                <label for="public_name">{{ 'public_name' | t }}</label>
                <div class="description">{{ 'public_name_label' | t }}</div>
                <input id="public_name" type="text" placeholder="NRS Public Name" v-model.lazy="formData.publicName" />
                <input type="submit" :value="'create_domain' | t" />
            </div>
        </form>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import api from "@/service/safe/api";

    export default {
        name: 'domain-create',
        components: {
            PageTitleWithActions
        },
        data: function() {
            return {
                formData: {
                    publicName: ""
                }
            }
        },
        methods: {
            createDomain: function() {
                api.createContainer().then(containerXorURL => {
                    api.createDomain(this.formData.publicName, containerXorURL + "?v=1", true, true, false).then(container => {
                        api.setTheme(this.formData.publicName, "Zen").then(_ => {
                            api.setCurrentDomain(this.formData.publicName).then(response => {
                                this.$root.$data.domain = this.formData.publicName;
                                this.$router.push("/app/posts");
                            });
                        });
                    })
                });
            }
        }
    }
</script>

<style scoped lang="scss">

</style>