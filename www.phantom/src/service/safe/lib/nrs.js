import promise from "../promise";

const nrs = function (callback) {
    this.getLocalNRS = function() {
        return promise(async function(ctx) {
            let anonFunction = async function() {
                return [];
            };

            console.log(ctx);

            return ctx.cache.get("nrs", anonFunction, []);
        })
    }
};

export default new nrs();