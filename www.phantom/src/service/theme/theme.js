import api from '@/service/safe/api';

const Theme = function(config) {
    this.config = config;

    this.getComputedTemplate = function() {
        let parent = this;

        return api.fetch(this.config.template).then(response => {
            return response.text();
        }).then(async function(template) {
            let scriptData = "",
                styleData = "";

            for (let i = 0; i < parent.config.scripts.length; i++) {
                scriptData += await (await api.fetch(parent.config.scripts[i])).text();
            }

            for (let i = 0; i < parent.config.styles.length; i++) {
                styleData += await (await api.fetch(parent.config.styles[i])).text();
            }

            console.log(styleData)

            return template
                .replace(/<!-- PhantomTemplate:Style -->/g, '<style type="text/css">' + styleData + '</style>')
                .replace(/<!-- PhantomTemplate:Script -->/g, '<script type="text/javascript">' + scriptData + '</script>');
        })
    };
};

export default Theme;