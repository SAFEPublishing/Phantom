import promise from "../promise";

const nrs = function (callback) {
    this.createContainer = function() {
        return promise(async function(ctx) {
            return ctx.safe.files_container_create_empty()
        });
    };

    this.updateFile = function(content, filesContainerXorURL, path) {
        // If no path is passed, this will generate a random path
        path = typeof path !== "string" ? Math.random().toString(36).substr(2, 10) : path;

        return promise(async function(ctx) {
            let buffer = content.toBuffer();
            return ctx.safe.files_container_add_from_raw(buffer, filesContainerXorURL + '/' + path, true, true, false);
        });
    };

    this.getPosts = function(nrs) {
        return promise(async function(ctx) {
            return ctx.cache.get(nrs + "/posts", async function() { return []; });
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