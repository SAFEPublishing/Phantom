import promise from "../promise";

const nrs = function (callback) {
    this.createContainer = function() {
        return promise(async function(ctx) {
            return ctx.safe.files_container_create_empty()
        });
    };

    this.getPosts = function(nrs) {
        return promise(async function(ctx) {
            return ctx.cache.get(nrs + "/posts", async function() { return []; });
        })
    }
};

export default new nrs();