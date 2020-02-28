import api from '@/service/safe/api';
import Theme from '@/service/theme/theme';

const importer = {
    import: function(url) {
        return api.fetch(url).then(config => {
            return config.text();
        }).then(async function(config) {
            let theme = new Theme(JSON.parse(config));

            while (typeof theme.config.parent === "string") {
                let parentTheme = new Theme(JSON.parse(await (await api.fetch(theme.config.parent)).text()));
                theme.mergeConfig(parentTheme);
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