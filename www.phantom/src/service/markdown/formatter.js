const formatter = {
    getDefaultMarkdown: function() {
        return "#Post title\nPhantom uses **Markdown** to edit posts.\nIt's _really_ easy to get started, just click anywhere and start typing.\nWhen you're done, click on the save button at the bottom of the page.";
    },

    getTitle: function(markdown) {
        return markdown.split(/#(.+)/)[0];
    },

    getParsedMarkdown: function(markdown) {
        return markdown;
    }
};

export default formatter;