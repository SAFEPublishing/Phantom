<template>
    <div>
        <PageTitleWithActions title="Edit post" :actions="actions" />
        <Loader v-if="!loaded" text="Loading post from cache" />
        <div class="editor-container">
            <h1 class="title" contenteditable="true" v-html="titleContent"></h1>
            <div class="editor" v-if="post">
                <form @submit="updatePost">
                    <div class="postContent" contenteditable="true" v-html="markdownContent" @input="handlePostInput"></div>
                </form>
            </div>
            <div class="preview" v-html="htmlContent"></div>
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
                rawContent: "",
                titleContent: "",
                htmlContent: "",
                markdownContent: "",
                actions: [
                    { text: "Save post", callback: this.updatePost },
                    { text: "Publish post", callback: this.publishPost }
                ]
            }
        },
        methods: {
            updatePost: function() {
                console.log(this.rawContent)
            },
            handlePostInput: function(e) {
                this.rawContent = ("#" + this.titleContent + "\n"+ e.target.innerHTML).getSanitizedMarkdown();
                this.htmlContent = formatter.getParsedHTML(this.rawContent);
            }
        },
        mounted() {
            api.getPost(this.$root.$data.domain, this.$router.currentRoute.params.file).then(post => {
                if (post) {
                    this.loaded = true;
                    this.post = post;

                    let newPost = !post.data || post.data === "";
                    this.rawContent = newPost ? formatter.getDefaultMarkdown() : post.data;
                    this.titleContent = formatter.getTitle(this.rawContent);
                    this.htmlContent = formatter.getParsedHTML(this.rawContent);
                    this.markdownContent = formatter.getEditableMarkdown(this.rawContent);
                }
            });
        }
    }
</script>

<style scoped lang="scss">
    .editor-container {
        font-size: 0;

        h1 {
            margin: 20px;
            font-size: 30px;
        }

        .title, .postContent {
            outline: none;
            white-space: pre-wrap
        }
    }

    .editor, .preview {
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding: 20px;
        font-size: 17px;
    }

    .preview {
        padding-top: 0;
        background-color: #fff;
    }
</style>