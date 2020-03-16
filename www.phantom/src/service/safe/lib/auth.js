import promise from "../promise";
import logger from "@/service/log/logger";

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
            logger.createEvent('auth', token ? 'Loaded auth token from cache' : 'Requested new authentication token from auth_app');
            return token ? token : ctx.safe.auth_app(appInfo.id, appInfo.name, appInfo.vendor);
        }).then(response => promise(async function(ctx) {
            logger.createEvent('auth', 'Attempted to connect to network');
            // In the SAFE browser, this returns "undefined" on success
            await ctx.safe.connect(appInfo.id, response);
            ctx.cache.set("auth", response);
            logger.createEvent('auth', 'Connected to network');
            return true;
        }))
    };

    this.logout = function() {
        return promise(async function(ctx) {
            logger.createEvent('auth', 'Deleted authentication token');
            return ctx.cache.set("auth", false);
        });
    };
};

export default new auth();