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
};

export default Theme;