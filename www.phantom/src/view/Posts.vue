<template>
    <div>
        <PageTitleWithActions title="Posts" :actions="actions" />
        <Loader v-if="!posts" text="Loading posts from cache" />
        <div v-if="hasDrafts" class="urgent">
            <div class="urgent-title">Unpublished drafts</div>
            <div>To release a new version of safe://{{ $root.$data.domain }} including all unpublished drafts click "Publish drafts" at the top right.</div>
        </div>
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
                    <td>
                        <a v-if="post.state === 'published'" :href="($root.$data.domain + '/' + post.file) | safeURL" target="_blank">{{ post.title }}</a>
                        <span v-if="post.state !== 'published'">{{ post.title }}</span>
                    </td>
                    <td><div class="post-state" :class="post.state">{{ post.state }}</div></td>
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
    import canonical from "@/service/markdown/canonical";

    export default {
        name: 'posts',
        components: {
            PageTitleWithActions,
            Loader
        },
        data: function() {
            return {
                posts: false,
                hasDrafts: false,
                actions: [],
                themes: [],
                activeTheme: false
            }
        },
        methods: {
            createPost: function() {
                let post = {
                    file: Math.random().toString(36).substr(2, 10),
                    state: "local-draft",
                    data: false,
                    map: false,
                    created: (new Date).toISOString(),
                    modified: (new Date).toISOString()
                };

                api.addPost(this.$root.$data.domain, post);
                this.$router.push("/app/post/" + post.file);
            },

            publishDrafts: function() {
                let theme = false;

                for (let i = 0; i < this.themes.length; i++) {
                    if (this.themes[i].config.name === this.activeTheme) {
                        theme = this.themes[i];
                    }
                }

                if (!theme) {
                    throw new Error("No theme is currently installed");
                }

                theme.getComputedTemplate(this.$root.$data.domain).then(template => {
                    api.updateFile(template, this.$root.$data.domain, "index.html", true).then(response => {
                        this.resetActions();
                        this.loadPosts();
                    });
                });
            },
            loadThemes: function() {
                api.getInstalledThemes().then(themes => {
                    this.themes = themes;

                    api.getTheme(this.$root.$data.domain).then(theme => {
                        this.activeTheme = theme;
                    })
                });
            },
            loadPosts: function() {
                api.getPosts(this.$root.$data.domain).then(posts => {
                    for (let i = 0; i < posts.length; i++) {
                        this.hasDrafts = this.hasDrafts || posts[i].state === "draft";
                        posts[i].title = formatter.getTitle((!posts[i].data || posts[i].data === "") ? formatter.getDefaultMarkdown() : canonical.getMarkdownFromHTML(posts[i].data));
                    }

                    if (this.hasDrafts) {
                        this.actions.push({
                            text: 'Publish drafts',
                            callback: this.publishDrafts
                        });
                    }

                    this.posts = posts;
                });
            },
            resetActions: function() {
                this.hasDrafts = false;
                this.actions = [{ text: "Create post", callback: this.createPost }];
            }
        },
        mounted() {
            this.resetActions();
            this.loadThemes()
            this.loadPosts();
        }
    }
</script>

<style scoped lang="scss">

    .urgent {
        margin-top: 30px;
        padding: 20px;
        background-color: #264c74;
        color: #fff;
        border-radius: 5px;

        .urgent-title {
            padding-bottom: 5px;
            font-weight: bold;
        }
    }

    .post-state {
        display: inline-block;
        vertical-align: top;
        padding: 2px 8px;
        color: #fff;
        font-weight: bold;
        font-size: 11px;
        text-transform: uppercase;
        border-radius: 4px;

        &.local-draft {
            background-color: #b35230;
        }

        &.draft {
            background-color: #b3a01d;
        }

        &.published {
            background-color: #50b31d;
        }
    }
</style>