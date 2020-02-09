/**
 * This file mocks the window.Safe library calls, for testing on clearnet websites or when the SAFE network app has
 * bugs which prevent us from authenticating. I encourage the usage of this file outside of this project and as such
 * it has 0 dependencies and can be readily copy-and-pasted
 *
 * @author Shane Armstrong <shane@helldritch.com>
 * @licence MIT
 * @package Phantom
 */

// To disable the injection of random network errors, set this to false
const throwErrors = true;

function throwErrorRandomly() {
    if (!throwErrors) {
        return;
    }

    if (Math.round(Math.random() * 10) === 0) {
        throw "Injected a random NEON error, make sure your code handles unexpected network error states";
    }
}

export default {
    // This generates an auth string which can be passed to `connect(app_id, credentials)` as the second parameter
    auth_app : function(id, name, vendor) {
        throwErrorRandomly();
        return id + '/' + name + '/' + vendor;
    },

    connect(app_id, credentials) {
        throwErrorRandomly();
        return true;
    }
}