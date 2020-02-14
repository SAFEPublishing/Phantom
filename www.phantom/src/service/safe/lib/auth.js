import promise from "../promise";

const appInfo = {
    id: "app.SAFEPublishing.phantom",
    name: "Phantom",
    vendor: "SAFE Publishing"
};

const auth = function (callback) {
    this.authenticate = function() {
        return promise(async function(ctx) {
            return ctx.cache.get("auth", async function() { return ctx.safe.auth_app(appInfo.id, appInfo.name, appInfo.vendor) });
        }).then(response => promise(async function(ctx) {
            return ctx.safe.connect(appInfo.id, auth)
        }));
    }
};

export default new auth();