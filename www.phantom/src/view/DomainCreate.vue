<template>
    <div>
        <PageTitleWithActions title="Create domain" />
        <form class="default" @submit="createDomain">
            <div class="group">
                <label for="public_name">NRS Public name</label>
                <div class="description">This will be the URL people use to load your website. For example, if you entered "funkyduck", users would access it via safe://funkyduck</div>
                <input id="public_name" type="text" placeholder="NRS Public Name" v-model.lazy="formData.publicName" />
                <input type="submit" value="Create" />
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
                        api.setTheme(this.formData.publicName, "Light").then(_ => {
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