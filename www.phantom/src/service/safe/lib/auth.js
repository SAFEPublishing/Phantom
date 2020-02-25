import promise from "../promise";

const appInfo = {
    id: "app.SAFEPublishing.phantom",
    name: "Phantom",
    vendor: "SAFE Publishing"
};

const auth = function () {
    this.getAuthToken = function() {
        return promise(async function(ctx) {
            return ctx.cache.get("auth", async function () {
                return false
            });
        });
    };

    this.authenticate = function(token) {
        return promise(async function(ctx) {
            return token ? token : ctx.safe.auth_app(appInfo.id, appInfo.name, appInfo.vendor);
        }).then(response => promise(async function(ctx) {
            // In the SAFE browser, this returns "undefined" on success
            await ctx.safe.connect(appInfo.id, response);
            ctx.cache.set("auth", response);
            return true;
        }))
    };

    this.logout = function() {
        return promise(async function(ctx) {
            return ctx.cache.set("auth", false);
        });
    };
};

export default new auth();