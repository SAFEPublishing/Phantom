import promise from "../promise";

const nrs = function (callback) {
    this.getLocalContainers = function() {
        return promise(async function(ctx) {
            return ctx.cache.get("nrs", async function() { return []; }, []);
        })
    };

    this.createContainer = function(publicName, filesContainerXorURL) {
        return promise(async function(ctx) {
            let data = await ctx.safe.nrs_map_container_create(publicName, filesContainerXorURL, true, true, false);
            let existingData = await ctx.cache.get("nrs", async function() { return []; }, []);
            existingData.push(data);
            ctx.cache.set("nrs", existingData);
            return data;
        })
    }
};

export default new nrs();