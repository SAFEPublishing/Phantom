<template>
    <div>
        <PageTitleWithActions title="Themes" :actions="actions" />
        <Loader v-if="!themes" text="Loading themes from cache" />
        <div class="themes">
            <div v-for="theme in themes" class="theme">
                <img :src="theme.config.banner" />
                <div class="name">{{ theme.config.name }}</div>
                <div class="description">{{ theme.config.description }}</div>
                <div class="button-container">
                    <div v-if="theme.config.name !== activeTheme" class="button" @click="installTheme(theme.config.name)">Install</div>
                </div>
                <div v-if="theme.config.name === activeTheme" class="active">This theme is currently installed</div>
            </div>
        </div>
        <Modal v-if="showModal" :actions="modalActions">
            <form class="default">
                <label for="theme-url">Theme URL</label>
                <div class="description">The SAFE network URL of the theme's manifest, this URL will end in ".json"</div>
                <input type="text" id="theme-url" placeholder="Theme URL" v-model.lazy="formData.url" />
            </form>
        </Modal>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import Modal from '@/component/Modal';
    import api from "@/service/safe/api";
    import Theme from "@/service/theme/theme";

    export default {
        name: 'themes',
        components: {
            PageTitleWithActions,
            Loader,
            Modal
        },
        data: function() {
            return {
                themes: [],
                activeTheme: false,
                showModal: false,
                actions: [
                    { text: "Import theme", callback: this.showImportThemeModal }
                ],
                modalActions: [
                    { text: "Cancel", callback: this.showImportThemeModal },
                    { text: "Import theme", callback: this.importTheme }
                ],
                formData: {
                    url: ""
                }
            }
        },
        methods: {
            installTheme: function(name) {
                api.setTheme(this.$root.$data.domain, name).then(response => {
                    this.loadThemes()
                });
            },
            loadThemes: function() {
                api.getInstalledThemes().then(themes => {
                    this.themes = themes;

                    api.getTheme(this.$root.$data.domain).then(theme => {
                        this.activeTheme = theme;
                    })
                });
            },
            showImportThemeModal: function() {
                this.showModal = !this.showModal;
            },
            importTheme: function() {
                let parent = this;

                api.fetch(this.formData.url).then(config => {
                    return config.text();
                }).then(async function(config) {
                    let theme = new Theme(JSON.parse(config));

                    while (typeof theme.config.parent === "string") {
                        let parentTheme = new Theme(JSON.parse(await (await api.fetch(theme.config.parent)).text()));
                        theme.mergeConfig(parentTheme);
                    }

                    theme.lintThemeConfig();

                    api.addInstalledTheme(theme).then(themes => {
                        parent.showModal = false;
                        parent.themes = themes;
                    }).catch(err => {
                        alert("Unable to install theme file, with error: " + err.message);
                    });
                }).catch(err => {
                   alert("Unable to load theme file, with error: " + err.message);
                });
            }
        },
        mounted() {
            this.loadThemes()
        }
    }
</script>

<style scoped lang="scss">
    .themes {
        padding-top: 20px;

        .theme {
            display: inline-block;
            vertical-align: top;
            width: 250px;
            padding: 20px;
            margin: 0 20px 20px 0;
            background-color: #fff;

            .name {
                padding-top: 5px;
                font-weight: bold;
            }

            .description {
                padding: 5px 0 10px 0;
                font-size: 13px;
                opacity: .8;
            }

            .button-container {
                text-align: right;
            }

            .active {
                padding: 10px;
                background-color: #264c74;
                color: #fff;
                font-weight: bold;
            }

            img {
                width: 100%;
            }
        }
    }
</style>