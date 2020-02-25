import promise from "../promise";
import Theme from '@/service/theme/theme';
import Light from '@/service/theme/light.json';
import Dark from '@/service/theme/dark.json';

const nrs = function (callback) {
    this.createContainer = function() {
        return promise(async function(ctx) {
            return ctx.safe.files_container_create_empty()
        });
    };

    this.updateFile = function(content, filesContainerXorURL, path, updateNRS) {
        return promise(async function(ctx) {
            let buffer = content.toBuffer();
            return ctx.safe.files_container_add_from_raw(buffer, filesContainerXorURL + '/' + path, true, updateNRS, false);
        });
    };

    this.getPosts = function(nrs) {
        return promise(async function(ctx) {
            return ctx.cache.get(nrs + "/posts", async function() { return []; });
        })
    };

    /**
     * The file isn't extracted from the post because it allows us to update posts when their file has been updated
     */
    this.updatePost = function(nrs, file, post) {
        return promise(async function(ctx) {
            let posts = await ctx.cache.get(nrs + "/posts", async function() { return []; });

            for (let i = 0; i < posts.length; i++) {
                if (posts[i].file === file) {
                    posts[i] = post;
                    ctx.cache.set(nrs + "/posts", posts);
                    return true;
                }
            }

            return false;
        })
    };

    this.getPost = function(nrs, file) {
        return promise(async function(ctx) {
            let posts = await ctx.cache.get(nrs + "/posts", async function() { return []; });

            for (let i = 0; i < posts.length; i++) {
                if (posts[i].file === file) {
                    return posts[i]
                }
            }

            return false;
        })
    };

    this.addPost = function(nrs, data) {
        return promise(async function(ctx) {
            let posts = await ctx.cache.get(nrs + "/posts", async function() { return []; });
            posts.push(data);
            ctx.cache.set(nrs + '/posts', posts);
            return posts;
        });
    };

    this.fetch = function(url) {
        return promise(async function(ctx) {
            return ctx.safe.fetch(url);
        });
    };

    this.getInstalledThemes = function() {
        return promise(async function(ctx) {
            let themes = await ctx.cache.get("themes", async function() { return [new Theme(Light), new Theme(Dark)]; });

            for (let i = 0; i < themes.length; i++) {
                themes[i] = new Theme(themes[i].config);
            }

            return themes;
        })
    };

    this.addInstalledTheme = function(theme) {
        let parent = this;

        return promise(async function(ctx) {
            let themes = await parent.getInstalledThemes();

            for (let i = 0; i < themes.length; i++) {
                if (themes[i].config.name === theme.config.name) {
                    throw new Error("Theme is already installed");
                }
            }

            themes.push(theme);
            ctx.cache.set("themes", themes);
            return themes;
        });
    };
};

export default new nrs();