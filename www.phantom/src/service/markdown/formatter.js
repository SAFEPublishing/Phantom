String.prototype.removeFirstTitle = function() {
    return this.replace(/^(#.*\n)/m, "");
};

String.prototype.replaceSingleTag = function(match, tag) {
    return this.replace(new RegExp(match + "(.*)" + match, "gm"), "<" + tag + ">" + "$1" + "</" + tag + ">");
};

String.prototype.replaceTagToEndOfLine = function(match, tag) {
    return this.replace(new RegExp("^" +  match + "(.*)", "gm"), "<" + tag + ">" + "$1" + "</" + tag + ">\n");
};

String.prototype.replaceImages = function() {
    return this.replace(/\!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
};

String.prototype.replaceAnchors = function() {
    return this.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
};

String.prototype.getSanitizedMarkdown = function() {
    return this
        // Replace multiple newlines with a single new line
        .replace(/(<br>){1,}/g, "\n")
        // Sometimes content editable adds empty divs, clean them up here, we should have 0 divs
        .replace(/(<div>)+/g, "\n")
        .replace(/(<\/div>)+/g, "")
};

const formatter = {
    getDefaultMarkdown: function() {
        return "#Draft post\nPhantom uses **Markdown** to edit posts.\nIt's _really_ easy to get started, just click anywhere and ~start~ begin typing. The content will automatically update as you add new Markdown tags.\n* This is pretty cool, right?\n* We thought so too!\nWhen you're done editing, click on the save button at the top of the page. When you want other people to be able to see this post, click on the publish post button instead.";
    },

    getTitle: function(markdown) {
        // Index 1 because split creates the first index as an empty string
        return markdown.split(/#(.+)/)[1];
    },

    /**
     * Takes markdown as an input and spits out formatted HTML
     *
     * @param markdown string
     * @returns string
     */
    getParsedHTML: function(markdown) {
        return markdown
            // Remove the first title tag - that's the top level post title
            .removeFirstTitle()
            .replaceSingleTag("\\*\\*", "b")
            .replaceSingleTag("\\_", "i")
            .replaceSingleTag("\\~", "s")
            .replaceTagToEndOfLine("#####", "h5")
            .replaceTagToEndOfLine("####", "h4")
            .replaceTagToEndOfLine("###", "h3")
            .replaceTagToEndOfLine("##", "h2")
            .replaceTagToEndOfLine("#", "h1")
            // Now that the bold tags are dealt with, we can format lists safely
            .replaceTagToEndOfLine("\\*", "li")
            // Images must be injected before anchors due to the similar syntax
            .replaceImages()
            // Now we can inject anchors
            .replaceAnchors()
            // Now we've dealt with every other special case we can insert paragraphs to the left overs
            .replace(/^((?!<h|<li).+)/gm, "<p>$1</p>")
            // Purge all the remaining new lines so we can inject logical new lines
            .replace(/\n/g, "")
            // Now we can add new lines where they _should_ be
            .replace(/<\/(p|li|h[1-5])>/gm, "</$1>\n");
    },

    getEditableMarkdown: function(markdown) {
        return markdown.removeFirstTitle()
            .replace(/\n/g, "<br><br>");
    }
};

export default formatter;