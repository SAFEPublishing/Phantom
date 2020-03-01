import promise from "../promise";
import Theme from '@/service/theme/theme';

const nrs = function (callback) {
    this.createContainer = function() {
        return promise(async function(ctx) {
            return ctx.safe.files_container_create_empty()
        });
    };

    /**
     * This is to be used when we're dealing with text content
     */
    this.updateFile = function(content, filesContainerXorURL, path, updateNRS) {
        return promise(async function(ctx) {
            let buffer = content.toBuffer();
            return ctx.safe.files_container_add_from_raw(buffer, filesContainerXorURL + '/' + path, true, updateNRS, false);
        });
    };

    /**
     * This is to be used when we are dealing exclusively with ArrayBuffer / UInt8Array
     */
    this.updateRawFile = function(buffer, filesContainerXorURL, path, updateNRS) {
        return promise(async function(ctx) {
            return ctx.safe.files_container_add_from_raw(buffer, filesContainerXorURL + '/' + path, true, updateNRS, false);
        });
    };

    this.getGenericDocuments = function(nrs, type) {
        return promise(async function(ctx) {
            let documents = await ctx.cache.get(nrs + "/" + type, async function() { return []; });

            return documents.sort((a, b) => {
                return new Date(b.modified) - new Date(a.modified);
            });
        })
    };

    /**
     * The file isn't extracted from the document because it allows us to update posts when their file has been updated
     */
    this.updateGenericDocument = function(nrs, file, document, type) {
        return promise(async function(ctx) {
            let documents = await ctx.cache.get(nrs + "/" + type, async function() { return []; });

            for (let i = 0; i < documents.length; i++) {
                if (documents[i].file === file) {
                    documents[i] = document;
                    ctx.cache.set(nrs + "/" + type, documents);
                    return true;
                }
            }

            return false;
        })
    };

    this.getGenericDocument = function(nrs, file, type) {
        return promise(async function(ctx) {
            let documents = await ctx.cache.get(nrs + "/" + type, async function() { return []; });

            for (let i = 0; i < documents.length; i++) {
                if (documents[i].file === file) {
                    return documents[i]
                }
            }

            return false;
        })
    };

    this.addGenericDocument = function(nrs, data, type) {
        return promise(async function(ctx) {
            let documents = await ctx.cache.get(nrs + "/" + type, async function() { return []; });
            documents.push(data);
            ctx.cache.set(nrs + '/' + type, documents);
            return documents;
        });
    };

    this.fetch = function(url) {
        return promise(async function(ctx) {
            return ctx.safe.fetch(url);
        });
    };

    this.getInstalledThemes = function() {
        return promise(async function(ctx) {
            let themes = await ctx.cache.get("themes", async function() { return []; });

            for (let i = 0; i < themes.length; i++) {
                themes[i] = new Theme(themes[i].config);
            }

            return themes;
        })
    };

    this.addInstalledTheme = function(theme) {
        let parent = this;

        return promise(async function(ctx) {
            let themes = await parent.getInstalledThemes();

            for (let i = 0; i < themes.length; i++) {
                if (themes[i].config.name === theme.config.name) {
                    themes[i] = theme;
                    ctx.cache.set("themes", themes);
                    return themes;
                }
            }

            themes.push(theme);
            ctx.cache.set("themes", themes);
            return themes;
        });
    };

    this.getThemeConfig = function(nrs, theme) {
        return promise(async function(ctx) {
            return ctx.cache.get(nrs + "/theme/" + theme + "/config", async function() { return {}; });
        })
    };

    this.setThemeConfig = function(nrs, theme, value) {
        return promise(async function(ctx) {
            ctx.cache.set(nrs + "/theme/" + theme + "/config", value);
        });
    }
};

export default new nrs();