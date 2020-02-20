import promise from "../promise";

async function returnEmptyArray() {
    return [];
}

const nrs = function (callback) {
    this.getCurrentLocalContainer = function() {
        return promise(async function(ctx) {
            return ctx.cache.get("current-nrs", async function() { return false; });
        })
    };

    this.setCurrentLocalContainer = function(domain) {
        return promise(async function(ctx) {
            return ctx.cache.set("current-nrs", domain);
        })
    };


    this.getLocalContainers = function() {
        return promise(async function(ctx) {
            return ctx.cache.get("nrs", returnEmptyArray);
        })
    };

    this.createContainer = function(publicName, filesContainerXorURL) {
        return promise(async function(ctx) {
            let data = await ctx.safe.nrs_map_container_create(publicName, filesContainerXorURL, true, true, false);
            let existingData = await ctx.cache.get("nrs", returnEmptyArray);
            existingData.push(data);
            ctx.cache.set("nrs", existingData);
            return data;
        })
    };

    this.setTheme = function(publicName, theme) {
        return promise(async function(ctx) {
            return ctx.cache.set(publicName + '/theme', theme);
        })
    };

    this.getTheme = function(publicName) {
        return promise(async function(ctx) {
            return ctx.cache.get(publicName + '/theme', async function() { return "Light"; });
        })
    }
};

export default new nrs();