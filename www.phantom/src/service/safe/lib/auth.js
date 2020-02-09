import promise from "../promise";

const appInfo = {
    id: "app.SAFEPublishing.phantom",
    name: "Phantom",
    vendor: "SAFE Publishing"
};

const auth = function (callback) {
    this.authenticate = function() {
        return promise(async function(safe) {
            return safe.auth_app(appInfo.id, appInfo.name, appInfo.vendor)
        }).then(response => promise(async function(safe) {
            return safe.connect(appInfo.id, auth)
        }));
    }
};

export default new auth();