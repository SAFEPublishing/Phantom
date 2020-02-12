<template>
    <div>
        <PageTitleWithActions title="Posts" :actions="actions" />
        <Loader v-if="!posts" text="Loading posts from cache" />
        <table v-if="posts">
            <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Created</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="posts && !posts.length">
                <td colspan="5">You currently have no posts, please click "create post" to get started</td>
            </tr>
            <tr v-for="domain in domains">
                <td><a :href="domain.publicName | safeURL" target="_blank">{{ domain.publicName | safeURL }}</a></td>
                <td>{{ domain.filesContainer | safeURL }}</td>
                <td>{{ domain.modified | timeAgo }}</td>
                <td>{{ domain.modified | timeAgo }}</td>
                <td><div class="button" @click="useDomain(domain.publicName)">Use</div></td>
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
        name: 'posts',
        components: {
            PageTitleWithActions,
            Loader
        },
        data: function() {
            return {
                posts: false,
                actions: [
                    { text: "Create post", callback: this.createPost }
                ]
            }
        },
        methods: {
            createPost: function() {
                alert("Feature coming in the next commit, stay tuned");
                this.$router.push("/app/posts/create");
            }
        },
        mounted() {
            api.getPosts(this.$root.$data.domain).then(posts => {
                this.posts = posts;
            });
        }
    }
</script>

<style scoped lang="scss">

</style>