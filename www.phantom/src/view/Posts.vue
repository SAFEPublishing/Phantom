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
                <tr v-for="post in posts">
                    <td><a :href="post.link | safeURL" target="_blank">{{ post.title }}</a></td>
                    <td>Draft</td>
                    <td>{{ post.modified | timeAgo }}</td>
                    <td>{{ post.created | timeAgo }}</td>
                    <td><router-link :to="'/app/post/' + post.file" class="button">Edit</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import api from "@/service/safe/api";
    import formatter from "@/service/markdown/formatter";

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
                // Will create an empty file with a random URI
                api.updateFile("", this.$root.$data.domain).then(response => {
                    let XorURL = response[1][""][1],
                    post = false; // This string is empty on purpose, this is how the API is currently implemented

                    for (let file in response[2]) {
                        if (response[2].hasOwnProperty(file) && response[2][file].link === XorURL) {
                            post = response[2][file];
                            post.file = file;
                            break;
                        }
                    }

                    if (!post) {
                        // Error state must be handled here
                    }

                    api.addPost(this.$root.$data.domain, post);
                    this.$router.push("/app/post/" + post.file);
                })
            }
        },
        mounted() {
            api.getPosts(this.$root.$data.domain).then(posts => {
                for (let i = 0; i < posts.length; i++) {
                    posts[i].title = formatter.getTitle((!posts[i].data || posts[i].data === "") ? formatter.getDefaultMarkdown() : posts[i].data);
                }

                this.posts = posts;
            });
        }
    }
</script>

<style scoped lang="scss">

</style>