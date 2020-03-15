import api from '@/service/safe/api';

const phantom = function() {
    // The following functions are for public use

    /**
     * @param event String
     * @param callback Function
     * @param priority Number
     * @returns void
     */
    this.addObserver = function(event, callback, priority) {
        if (!this._allowedEvents.includes(event)) {
            throw Error("The following observer event is not implemented in the Phantom plugin library: " + (typeof event === "string" ? event : "Unknown (not a string)"));
        }

        if (typeof callback !== "function") {
            throw new Error("You must pass a callback function to phantom.addObserver");
        }

        // Set an average priority if none is given and clamp it to between 0 and 255
        priority = typeof priority !== "number" ? 122 : Math.max(0, Math.min(255, priority));

        if (!this._observers.hasOwnProperty(event)) {
            this._observers[event] = [];
        }

        this._observers[event].push({
            priority: priority,
            callback: callback
        });
    };

    /**
     * Loads a file by name from the NRS we are currently modifying, or a different NRS if provided
     *
     * @returns {Promise<String>}
     */
    this.getFile = async function(file, nrs) {
        if (typeof nrs !== "string") {
            nrs = await api.getCurrentDomain();
        }

        return await api.fetch(nrs + "/" + (file.replace(/^\/+/, '')));
    };

    /**
     *
     * @returns {Promise<String>}
     */
    this.getNRS = async function() {
        return api.getCurrentDomain();
    };

    /**
     * Updates a file by name from the NRS we are currently modifying, or a different NRS if provided
     *
     * @returns {Promise<void>}
     */
    this.updateFile = async function(file, content, nrs) {
        if (typeof nrs !== "string") {
            nrs = await api.getCurrentDomain();
        }

        return await api.updateFile(content, nrs, file.replace(/^\/+/, ''), false);
    };

    // The following functions are for internal use

    this._allowedEvents = ['preCompile', 'postCompile'];
    this._observers = {};

    this._processEvent = async function(observerEvent, data) {
        if (this._observers.hasOwnProperty(observerEvent)) {
            let observers = this._observers[observerEvent].sort((a, b) => b.priority - a.priority);

            for (let i = 0; i < observers.length; i++) {
                data = await observers[i].callback(data);
            }
        }

        return data;
    };
};

export default new phantom();