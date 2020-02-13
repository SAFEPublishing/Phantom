/**
 * This file mocks the window.Safe library calls, for testing on clearnet websites or when the SAFE network app has
 * bugs which prevent us from authenticating. I encourage the usage of this file outside of this project and as such
 * it has 0 dependencies and can be readily copy-and-pasted
 *
 * @author Shane Armstrong <shane@helldritch.com>
 * @licence MIT
 * @package Phantom
 */
import files from "../lib/files";

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

function getRandomMockXorURL() {
    let generation = function() {
        return Math.random().toString(36).substr(2, 10);
    };

    return btoa(generation() + generation() + generation());
}

export default {
    // This generates an auth string which can be passed to `connect(app_id, credentials)` as the second parameter
    auth_app(id, name, vendor) {
        throwErrorRandomly();
        return btoa(id + '/' + name + '/' + vendor);
    },

    connect(app_id, credentials) {
        throwErrorRandomly();
        return true;
    },

    files_container_create_empty() {
        throwErrorRandomly();
        return getRandomMockXorURL();
    },

    files_container_add_from_raw(buffer, path, force, updateNRS, dryRun) {
        throwErrorRandomly();

        let current = (new Date()).toISOString(),
            resource = getRandomMockXorURL(),
            nameDefinition = {},
            filesDefinition = {},
            relativePath = path.split("/");
        relativePath.shift();
        relativePath = relativePath.join("/");

        // This empty string is on purpose, this is how the SAFE browser currently returns the URIs when you're updating an NRS URL file
        nameDefinition[""] = ["*", resource];
        filesDefinition[relativePath] = {created: current, link: "safe://" + resource, modified: current, size: buffer.length, type: "Raw"};

        return [
            1, //version
            nameDefinition,
            filesDefinition
        ];
    },

    nrs_map_container_create(publicName, filesContainerXorURL, defaultContainer, hardLink, dryRun) {
        throwErrorRandomly();

        let current = (new Date()).toISOString(),
            nameDefinition = {};
        nameDefinition[publicName] = ["+", filesContainerXorURL];

        return [
            filesContainerXorURL.split("?")[0],
            nameDefinition,
            {
                default: {
                    OtherRdf: {
                        created: current,
                        link: filesContainerXorURL,
                        modified: current
                    }
                }
            }
        ];
    }
}