let getTimestamp = function() {
    // Standardise time to seconds since local epoch, should be supported by everything since IE3
    return (new Date()).getTime()/1000|0;
};

const cache = {
    /**
     * Usage:
     *      cache.get("example-key", safe.auth_app, [appInfo.id, appInfo.name, appInfo.vendor], ?300)
     *          .then(response => {})
     *          .catch(err => {});
     *
     * @param key {string}
     * @param callback {function}             The function to call on cache MISS
     * @param callbackData {array<string>}    This will be passed to the callback via the spread operator
     * @param expires {number}                Default expiry time for a GET is 1 year, expiry time is refreshed on a successful GET
     * @returns {Promise<unknown>}
     */
    get: function(key, callback, callbackData, expires) {
        return new Promise(function (resolve, reject) {
            let data = localStorage.getItem(key);

            if (data) {
                data = JSON.parse(data);

                if (parseInt(data.expires) >= parseInt(getTimestamp())) {
                    // Refresh the cache on a successful HIT
                    data.expires = getTimestamp() + parseInt(data.expiryLength);
                    localStorage.setItem(key, JSON.stringify(data));

                    return resolve(data.data);
                }

                // Cache has expired, remove it
                localStorage.removeItem(key);
            }

            // On cache MISS or expiry
            return callback().then(response => {
                let expiryLength = (typeof expires === "number" ? expires : 31536000);

                let data = {
                    data: response,
                    expires: getTimestamp() + expiryLength,
                    expiryLength: expiryLength
                };

                localStorage.setItem(key, JSON.stringify(data));
                return resolve(response);
            });
        })
    },

    set(key, value, expires) {
        let expiryLength = (typeof expires === "number" ? expires : 31536000);

        let data = {
            data: value,
            expires: getTimestamp() + expiryLength,
            expiryLength: expiryLength
        };

        localStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * Usage:
     *      cache.expire("example-key")
     *          .then(_ => {});
     *
     * It is not possible for this function to throw an Error in the targeted SAFE browsers, so no catch block is necessary
     *
     * @param key {string}
     * @returns {Promise<unknown>}
     */
    expire: function(key) {
        return new Promise(function (resolve, reject) {
            let data = localStorage.removeItem(key);
            return resolve(true);
        });
    }
};

export default cache;