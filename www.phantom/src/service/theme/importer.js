import api from '@/service/safe/api';
import Theme from '@/service/theme/theme';

const importer = {
    import: function(url, translations, translate) {
        return api.fetch(url).then(config => {
            return config.text();
        }).then(async function(config) {
            let theme = new Theme(JSON.parse(config));

            if (typeof theme.config.parent === "undefined") {
                // This triggers internationalisation and a few other nice-to-haves
                let mockParentTheme = new Theme(JSON.parse(config));
                mockParentTheme.config = {};
                await theme.mergeConfig(mockParentTheme, translations, translate);
            } else {
                while (typeof theme.config.parent === "string") {
                    let parentTheme = new Theme(JSON.parse(await (await api.fetch(theme.config.parent)).text()));
                    await theme.mergeConfig(parentTheme, translations, translate);
                }
            }

            theme.lintThemeConfig();
            theme.config.origin = url;

            return api.addInstalledTheme(theme);
        }).catch(err => {
            alert("Unable to load theme file, with error: " + err.message);
        });
    }
};

export default importer;