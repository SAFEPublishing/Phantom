import promise from './promise';
import auth from './lib/auth';

const appInfo = {
    id: "app.SAFEPublishing.phantom",
    name: "Phantom",
    vendor: "SAFE Publishing"
};

const safe = typeof window.Safe !== "undefined" ? (new window.Safe()) : false;

const api = function() {
    this.safe = safe;
    this.appInfo = appInfo;

    this.authenticate = function() {
        let auth = promise(async function() {
            return await this.safe.auth_app(appInfo.id, appInfo.name, appInfo.vendor)
        }, this);

        safe.connect("net.maidsafe.safe-nodejs", auth);
    };
};

export default new api();