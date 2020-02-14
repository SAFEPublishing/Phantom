<template>
    <div>
        <PageTitleWithActions title="Edit post" />
        <Loader v-if="!loaded" text="Loading post from cache" />
        <div class="editor" v-if="post">
            <form @submit="updatePost">
                <h1 class="title" contenteditable="true">Post title</h1>
                <div class="postContent" contenteditable="true" v-html="htmlContent"></div>
            </form>
        </div>
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
                loaded: false,
                post: false,
                titleContent: "",
                htmlContent: "",
                markdownContent: ""
            }
        },
        methods: {
            updatePost: function() {

            }
        },
        mounted() {
            api.getPost(this.$root.$data.domain, this.$router.currentRoute.params.file).then(post => {
                if (post) {
                    this.loaded = true;
                    this.post = post;

                    let newPost = !post.data || post.data === "";
                    this.markdownContent = newPost ? formatter.getDefaultMarkdown() : post.data;
                    this.titleContent = formatter.getTitle(this.markdownContent);
                    this.htmlContent = formatter.getParsedMarkdown(this.markdownContent);
                }
            });
        }
    }
</script>

<style scoped lang="scss">
    .editor {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;

        .title, .postContent {
            outline: none;
        }
    }
</style>