<template>
    <div>
        <PageTitleWithActions :title="'themes' | t" :actions="actions" />
        <Loader v-if="!themes" text="Loading themes from cache" />
        <div class="themes">
            <div v-for="theme in themes" class="theme">
                <img :src="theme.config.banner" />
                <div class="name">{{ theme.config.name }}</div>
                <div class="description">{{ theme.config.description }}</div>
                <div class="button-container">
                    <div v-if="activeTheme && theme.config.name !== activeTheme.config.name" class="button" @click="installTheme(theme.config.name)">{{ 'install' | t }}</div>
                </div>
                <div v-if="activeTheme && theme.config.name === activeTheme.config.name" class="active">{{ 'theme_installed' | t }}</div>
                <div v-if="activeTheme && theme.config.name === activeTheme.config.name" class="upgrade" @click="upgradeTheme(theme.config.origin)">{{ 'theme_check' | t }}</div>
            </div>
        </div>
        <Modal v-if="showModal" :actions="modalActions">
            <form class="default">
                <label for="theme-url">{{ 'theme_url' | t }}</label>
                <div class="description">{{ 'theme_url_label' | t }}"</div>
                <input type="text" id="theme-url" :placeholder="'theme_url' | t" v-model.lazy="formData.url" />
            </form>
        </Modal>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import Modal from '@/component/Modal';
    import api from "@/service/safe/api";
    import importer from '@/service/theme/importer';

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
                    { text: this.$options.filters.t("theme_import"), callback: this.showImportThemeModal }
                ],
                modalActions: [
                    { text: this.$options.filters.t("cancel"), callback: this.showImportThemeModal },
                    { text: this.$options.filters.t("theme_import"), callback: this.importTheme }
                ],
                formData: {
                    url: ""
                }
            }
        },
        methods: {
            installTheme: function(name) {
                api.setTheme(this.$root.$data.domain, name).then(response => {
                    return api.getTheme(this.$root.$data.domain);
                }).then(theme => {
                    // Update the theme
                    return importer.import(theme.config.origin);
                }).then(_ => {
                    this.loadThemes(true);
                });
            },
            loadThemes: function(deploy) {
                api.getInstalledThemes().then(themes => {
                    this.themes = themes;

                    api.getTheme(this.$root.$data.domain).then(theme => {
                        if (deploy === true) {
                            theme.getComputedTemplate(this.$root.$data.domain).then(template => {
                                api.updateFile(template, this.$root.$data.domain, "index.html", true).then(response => {
                                    this.activeTheme = theme;
                                    alert("Theme files deployed");
                                });
                            });
                        } else {
                            this.activeTheme = theme;
                        }
                    });
                });
            },
            upgradeTheme: function(origin) {
                importer.import(origin).then(_ => {
                    this.loadThemes(true);
                });
            },
            showImportThemeModal: function() {
                this.showModal = !this.showModal;
            },
            importTheme: function() {
                let parent = this;

                importer.import(this.formData.url).then(themes => {
                    parent.showModal = false;
                    parent.themes = themes;
                }).catch(err => {
                    alert("Unable to install theme file, with error: " + err.message);
                });
            }
        },
        mounted() {
            this.loadThemes(false)
        }
    }
</script>

<style scoped lang="scss">
    .themes {
        margin-top: 30px;

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

            .upgrade {
                padding-top: 5px;
                color: #2d6cad;
                font-size: 13px;
                cursor: pointer;
            }
        }
    }

    @media (max-width: 767px) {
        .themes {
            text-align: center;

            .theme {
                width: 100%;
                max-width: 300px;
                margin: 0 auto 20px auto;
                text-align: left;
            }
        }
    }
</style>