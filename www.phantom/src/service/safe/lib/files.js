import promise from "../promise";

const nrs = function (callback) {
    this.createContainer = function() {
        return promise(async function(ctx) {
            return ctx.safe.files_container_create_empty()
        });
    }
};

export default new nrs();