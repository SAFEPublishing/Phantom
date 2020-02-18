import formatter from "./formatter";

const canonical = {
    getHTMLWrappedMarkdown: function (markdown) {
        let title = "/#/post/" + formatter.getSanitizedURI(formatter.getTitle(markdown));
        return '<html><head><link rel="canonical" href="' + title + '" /></head><body>' + markdown + '</body></html>';
    },

    getMarkdownFromHTML: function(html) {
        let matches = html.match(/<body>([\s\S]*)<\/body>/);
        return matches ? matches[1] : false;
    }
};

export default canonical;