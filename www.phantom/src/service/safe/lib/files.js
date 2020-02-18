import promise from "../promise";

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
};

export default new nrs();