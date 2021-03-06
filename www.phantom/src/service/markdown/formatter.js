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

String.prototype.replaceBlockQuotes = function() {
    return this.replace(/^(>|&gt;)[ \t]?(.+)/gm, '<blockquote>$2</blockquote>');
};

String.prototype.replaceCodeInline = function() {
    return this.replace(/`(.+)`/gm, '<code>$1</code>');
};

String.prototype.replaceCodeSpans = function() {
    return this.replace(/^```([a-zA-Z0-9]*)\n([\s\S]*?)```/gm, function(match, lang, code) {
        return '<div class="lang-' + lang + ' codeblock">' + code.replace(/\n/g, "{CODEBLOCK_NEWLINE}") + '</div>';
    });
};

String.prototype.replaceCodeSpanNewLines = function() {
    return this.replace(/\{CODEBLOCK_NEWLINE\}/gm, "\n");
};

String.prototype.replaceHorizontalRules = function() {
    return this.replace(/^(\_{3,}|\-{3,}|\*{3,})$/gm, "<hr />");
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
    getDefaultMarkdown: function(type, translate) {
        let text = "#" + translate("draft_post");

        for (let i = 1; i <= 5; i++) {
            text += "\n" + translate("post_default_" + i);
        }

        return text;
    },

    getTitle: function(markdown) {
        // Index 1 because split creates the first index as an empty string
        return markdown.split(/#(.+)/)[1];
    },

    // Extracts the first 35 words from the post content, not including the title
    getExcerpt: function(markdown) {
        return markdown
            .removeFirstTitle()
            .replace(/[^a-zA-Z0-9 ,.&\-_:;@~()!\"£$%^=+{}\[\]\/\\*']+/gm, "")
            .split(" ")
            .slice(0, 35)
            .join(" ") + "&hellip;"
    },

    /**
     * Takes markdown as an input and spits out formatted HTML
     *
     * @param markdown string
     * @param keepTitle bool
     * @returns string
     */
    getParsedHTML: function(markdown, keepTitle) {
        markdown = keepTitle === true ? markdown : markdown.removeFirstTitle();

        return markdown
            .replaceHorizontalRules()
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
            .replaceAnchors()
            .replaceCodeSpans()
            .replaceCodeInline()
            .replaceBlockQuotes()
            // Now we've dealt with every other special case we can insert paragraphs to the left overs
            .replace(/^((?!<h|<li|<div|<block|<hr).+)/gm, "<p>$1</p>")
            // Purge all the remaining new lines so we can inject logical new lines
            .replace(/\n/g, "")
            // Re-inject newlines in code spans
            .replaceCodeSpanNewLines()
            // Now we can add new lines where they _should_ be
            .replace(/<\/(p|li|h[1-5])>/gm, "</$1>\n");
    },

    getEditableMarkdown: function(markdown) {
        return markdown.removeFirstTitle()
            .replace(/\n/g, "<br><br>");
    },

    getSanitizedURI: function(title) {
        return title.replace(/[^a-zA-Z0-9 \-\_]/g, "").toLocaleLowerCase().replace(/ /g, "-");
    }
};

export default formatter;