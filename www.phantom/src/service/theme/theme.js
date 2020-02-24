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
                postData = await parent.getPostsBundle(domain);


            for (let i = 0; i < parent.config.scripts.length; i++) {
                scriptData += await (await api.fetch(parent.config.scripts[i])).text();
            }

            for (let i = 0; i < parent.config.styles.length; i++) {
                styleData += await (await api.fetch(parent.config.styles[i])).text();
            }

            return template
                .replace(/<\/head>/g, '<style type="text/css">' + styleData + '</style></head>')
                .replace(/<\/body>/g, '<script type="text/javascript">window.blogName = "' + domain + '"; window.posts = ' + JSON.stringify(postData) + ';</script></body>')
                .replace(/<\/body>/g, '<script type="text/javascript">' + scriptData + '</script></body>');
        })
    };

    this.getPostsBundle = async function (domain) {
        let posts = await api.getPosts(domain),
            response = [];

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].state === "draft") {
                posts[i].state = "published";
                await api.updatePost(domain, posts[i].file, posts[i]);
            }

            if (posts[i].state === "published") {
                let markdown = canonical.getMarkdownFromHTML(posts[i].data);

                response.push({
                    path: '/post/' + posts[i].file,
                    title: formatter.getTitle(markdown),
                    excerpt: formatter.getParsedHTML(formatter.getExcerpt(markdown), true), // The title has already been stripped out
                    template: formatter.getParsedHTML(markdown, true),
                });
            }
        }

        return response;
    };

    /**
     * Tests the config for any errors or missing fields
     *
     * @return boolean
     * @throws Error
     */
    this.lintThemeConfig = function() {
        let c = this.config;

        this.assert(typeof c.name === "string" && c.name.length, "The theme name must be a string with at least one character");
        this.assert(typeof c.description === "string" && c.description.length, "The theme description must be a string with at least one character");
        this.assert(typeof c.banner === "string" && c.banner.match(/\.(png|jpeg|jpg|gif)$/), "The theme banner must point to a file ending in .png|.jpeg|.jpg|.gif");
        this.assert(typeof c.template === "string" && c.template.match(/\.(html)$/), "The theme template must point to a file ending in .html");
        this.assert(Array.isArray(c.scripts) && c.scripts.length, "The theme must import at least one script file");
        this.assert(Array.isArray(c.styles) && c.styles.length, "The theme must import at least one css file");

        if (typeof c.config !== "undefined") {
            this.assert(Array.isArray(c.config) && c.config.length, "The theme config (if included) must be an array containing at least one object");

            c.config.forEach((item, i) => {
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