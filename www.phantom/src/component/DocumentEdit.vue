<template>
    <div>
        <PageTitleWithActions :title="'Edit ' + single" :actions="actions" />
        <Loader v-if="!loaded" :text="'Loading document from cache'" />
        <div class="editor-container">
            <h1 class="title" contenteditable="true" ref="title">{{ titleContent }}</h1>
            <div class="editor" v-if="document">
                <form @submit="updateDocument">
                    <div class="postContent" contenteditable="true" v-html="markdownContent" @input="handleDocumentInput" ref="content"></div>
                </form>
            </div>
            <div class="preview" v-html="htmlContent"></div>
        </div>
        <ImageGallery v-if="showImageGallery" :close="toggleImageGallery" />
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import ImageGallery from "@/component/ImageGallery";
    import api from "@/service/safe/api";
    import formatter from "@/service/markdown/formatter";
    import canonical from '@/service/markdown/canonical';

    export default {
        name: 'document-edit',
        components: {
            PageTitleWithActions,
            Loader,
            ImageGallery
        },
        props: {
            single: String,
            plural: String,
            urlPrefix: String
        },
        data: function() {
            return {
                loaded: false,
                document: false,
                rawContent: "",
                titleContent: "",
                htmlContent: "",
                markdownContent: "",
                showImageGallery: false,
                actions: [
                    { text: "Image Gallery", callback: this.toggleImageGallery },
                    { text: "Save " + this.single.toLowerCase(), callback: this.updateDocument }
                ]
            }
        },
        methods: {
            updateDocument: function() {
                this.titleContent = this.$refs.title.innerText;
                this.rawContent = ("#" + this.titleContent + "\n"+ this.$refs.content.innerHTML).getSanitizedMarkdown();

                let document = this.document,
                    oldFile = document.file;
                document.file = formatter.getSanitizedURI(this.titleContent);
                document.state = "draft";
                document.data = canonical.getHTMLWrappedMarkdown(this.rawContent);
                document.modified = (new Date).toISOString();

                api.updateFile(document.data, this.$root.$data.domain, document.file, false).then(response => {
                    document.map = response[1];

                    api.updateGenericDocument(this.$root.$data.domain, oldFile, document, this.plural.toLowerCase()).then(response => {
                        this.$router.push("/app/" + this.plural.toLowerCase());
                    });
                });
            },
            handleDocumentInput: function() {
                this.rawContent = ("#" + this.titleContent + "\n"+ this.$refs.content.innerHTML).getSanitizedMarkdown();
                this.htmlContent = formatter.getParsedHTML(this.rawContent, false);
            },
            toggleImageGallery: function() {
                this.showImageGallery = !this.showImageGallery;
            }
        },
        mounted() {
            api.getGenericDocument(this.$root.$data.domain, this.$router.currentRoute.params.file, this.plural.toLowerCase()).then(document => {
                if (document) {
                    this.loaded = true;
                    this.document = document;

                    let newDocument = !document.data || document.data === "";
                    this.rawContent = newDocument ? formatter.getDefaultMarkdown(this.single) : canonical.getMarkdownFromHTML(document.data);
                    this.titleContent = formatter.getTitle(this.rawContent);
                    this.htmlContent = formatter.getParsedHTML(this.rawContent, false);
                    this.markdownContent = formatter.getEditableMarkdown(this.rawContent);
                }
            });
        }
    }
</script>

<style scoped lang="scss">
    .editor-container {
        font-size: 0;

        h1 {
            margin: 20px;
            font-size: 30px;
        }

        .title, .postContent {
            outline: none;
            white-space: pre-wrap;
        }
    }

    .editor, .preview {
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding: 20px;
        font-size: 17px;
    }

    .preview {
        padding-top: 0;
        background-color: #fff;

        /deep/ {
            img {
                max-width: 100%;
            }

            blockquote {
                margin: 0;
                padding: 10px;
                border-left: 2px solid #bbb;
            }

            .codeblock {
                padding: 20px;
                margin-bottom: 1em;
                background-color: #252526;
                color: #f8ffff;
                font-family: monospace;
                white-space: pre;
                overflow-x: auto;
            }

            code {
                padding: 0 4px;
                background-color: #252526;
                color: #f8ffff;
                font-family: monospace;
            }
        }
    }
</style>