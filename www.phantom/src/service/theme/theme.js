import api from '@/service/safe/api';
import canonical from '@/service/markdown/canonical';
import formatter from '@/service/markdown/formatter';

const Theme = function(config) {
    this.config = config;

    this.getComputedTemplate = function (domain) {
        let parent = this;

        return api.fetch(this.config.template).then(response => {
            return response.text();
        }).then(async function (template) {
            let scriptData = "",
                styleData = "",
                postData = await parent.getGenericBundle(domain, "posts", "/post"),
                pageData = await parent.getGenericBundle(domain, "pages", "")
                config = await api.getThemeConfig(domain, parent.config.name);

            for (let i = 0; i < parent.config.scripts.length; i++) {
                scriptData += await (await api.fetch(parent.config.scripts[i])).text();
            }

            for (let i = 0; i < parent.config.styles.length; i++) {
                styleData += await (await api.fetch(parent.config.styles[i])).text();
            }

            return template
                .replace(/<\/head>/g, '<style type="text/css">' + styleData + '</style></head>')
                .replace(/<\/body>/g, '<script type="text/javascript">window.themeConfig = ' + JSON.stringify(config) + '; window.blogName = "' + domain + '"; window.posts = ' + JSON.stringify(postData) + '; window.pages = ' + JSON.stringify(pageData) + '</script></body>')
                .replace(/<\/body>/g, '<script type="text/javascript">' + scriptData + '</script></body>');
        })
    };

    this.getGenericBundle = async function (domain, type, prefix) {
        let documents = await api.getGenericDocuments(domain, type),
            response = [];

        documents = documents.sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
        });

        for (let i = 0; i < documents.length; i++) {
            if (documents[i].state === "draft") {
                documents[i].state = "published";
                await api.updateGenericDocument(domain, documents[i].file, documents[i], type);
            }

            if (documents[i].state === "published") {
                let markdown = canonical.getMarkdownFromHTML(documents[i].data);

                response.push({
                    path: prefix + '/' + documents[i].file,
                    title: formatter.getTitle(markdown),
                    excerpt: formatter.getParsedHTML(formatter.getExcerpt(markdown), true), // The title has already been stripped out
                    template: formatter.getParsedHTML(markdown, true),
                    created: documents[i].created
                });
            }
        }

        return response;
    };

    /**
     * This gives themes a concept of inheritance, merging applicable configuration fields to build up a final super-theme!
     *
     * @param theme Theme
     */
    this.mergeConfig = function(theme) {
        let a = this.config,
            b = theme.config;

        // Only in the case of the parent field do we prioritise the parent theme, this allows us to do fancy inheritance stuff
        a.parent = typeof b.parent === "string" ? b.parent : false;

        // For everything else, prioritise the child theme
        a.name = typeof a.name === "string" ? a.name : b.name;
        a.description = typeof a.description === "string" ? a.description : b.description;
        a.banner = typeof a.banner === "string" ? a.banner : b.banner;
        a.template = typeof a.template === "string" ? a.template : b.template;
        this.mergeConfigArrays(b, "scripts");
        this.mergeConfigArrays(b, "styles");
        this.mergeConfigArrays(b, "config");
    };

    this.mergeConfigArrays = function(parentTheme, index) {
        parentTheme[index] = Array.isArray(parentTheme[index]) ? parentTheme[index] : [];
        this.config[index] = Array.isArray(this.config[index]) ? parentTheme[index].concat(this.config[index]) : parentTheme[index];
    };

    /**
     * Tests the config for any errors or missing fields
     *
     * @return boolean
     * @throws Error
     */
    this.lintThemeConfig = function() {
        this.assert(typeof this.config.name === "string" && this.config.name.length, "The theme name must be a string with at least one character");
        this.assert(typeof this.config.description === "string" && this.config.description.length, "The theme description must be a string with at least one character");
        this.assert(typeof this.config.banner === "string" && this.config.banner.match(/\.(png|jpeg|jpg|gif)$/), "The theme banner must point to a file ending in .png|.jpeg|.jpg|.gif");
        this.assert(typeof this.config.template === "string" && this.config.template.match(/\.(html)$/), "The theme template must point to a file ending in .html");
        this.assert(Array.isArray(this.config.scripts) && this.config.scripts.length, "The theme must import at least one script file");
        this.assert(Array.isArray(this.config.styles) && this.config.styles.length, "The theme must import at least one css file");

        if (typeof this.config.config !== "undefined") {
            this.assert(Array.isArray(this.config.config) && this.config.config.length, "The theme config (if included) must be an array containing at least one object");

            this.config.config.forEach((item, i) => {
                this.assert(typeof item.name === "string" && item.name.length, "The theme config (index: " + i + ") name must be a string with at least one character");
                this.assert(typeof item.description === "string" && item.description.length, "The theme config (index: " + i + ", name: " + item.name + ") description must be a string with at least one character");
                this.assert((["single", "multi"].includes(item.count)), "The theme config (index: " + i + ", name: " + item.name + ") count must be a string with the value single|multi");
                this.assert(Array.isArray(item.fields) && item.fields.length, "The theme config (index: " + i + ", name: " + item.name + ") fields must be an array containing at least one object");

                item.fields.forEach((field, v) => {
                    this.assert(typeof field.name === "string" && field.name.length, "The theme config field (config index: " + i + ", field index: " + v + ") name must be a string with at least one character");
                    this.assert(typeof field.description === "string" && field.description.length, "The theme config field (config index: " + i + ", field name: " + field.name + ") description must be a string with at least one character");
                    this.assert((["text", "email", "date", "number", "tel", "password", "time", "file"].includes(field.type)), "The theme config field (config index: " + i + ", field name: " + field.name + ") type must be a string with the value text|email|date|number|tel|password|time|file");
                });
            });
        }
    };

    /**
     * @param condition boolean
     * @param message string
     * @throws Error
     */
    this.assert = function(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    };
};

export default Theme;