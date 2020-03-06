<template>
    <div>
        <PageTitleWithActions :title="'theme_config' | t" :actions="actions" />
        <Loader v-if="!theme || !loaded" text="Loading theme from cache" />
        <div v-if="theme && loaded" class="config">
            <form class="default">
            <div v-for="config in theme.config.config" class="config-item">
                <div class="name">{{ config.name | idToReadableString }}</div>
                <div class="description">{{ getTranslatedText(theme.config.name, config.description) }}</div>
                <div class="fields" v-if="config.count === 'multi'" v-for="(fieldGroup, index) in currentConfig[config.name]">
                    <div class="remove" @click="removeGroupEntry(currentConfig[config.name], index)">&times;</div>
                    <div v-for="field in config.fields" class="field">
                        <div class="name">{{ field.name | idToReadableString }}</div>
                        <div class="description">{{ getTranslatedText(theme.config.name, field.description) }}</div>
                        <input v-if="field.type !== 'file'" :type="field.type" v-model.lazy="fieldGroup[field.name]" />
                        <div v-if="field.type === 'file'">
                            <input :type="field.type" @change="processFileInput($event, fieldGroup)" />
                            <div class="file-data" v-if="typeof fieldGroup.xorurl !== 'undefined'">
                                Current: <a :href="fieldGroup.xorurl">{{ fieldGroup.xorurl }}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button" v-if="config.count === 'multi'" @click="addEmptyGroupEntry(config)">{{ 'add' | t}}</div>
                <div class="fields" v-if="config.count === 'single'">
                    <div v-for="field in config.fields" class="field">
                        <div class="name">{{ field.name | idToReadableString }}</div>
                        <div class="description">{{ getTranslatedText(theme.config.name, field.description) }}</div>
                        <input v-if="field.type !== 'file'" :type="field.type" v-model.lazy="currentConfig[config.name][field.name]" />
                        <div v-if="field.type === 'file'">
                            <input :type="field.type" @change="processFileInput($event, currentConfig[config.name][field.name])" />
                            <div class="file-data" v-if="typeof currentConfig[config.name][field.name].xorurl !== 'undefined'">
                                Current: <a :href="currentConfig[config.name][field.name].xorurl">{{ currentConfig[config.name][field.name].xorurl }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import api from "@/service/safe/api";

    export default {
        name: 'theme',
        components: {
            PageTitleWithActions,
            Loader
        },
        data: function() {
            return {
                theme: false,
                currentConfig: false,
                loaded: false,
                actions: [
                    { text: this.$options.filters.t("save"), callback: this.save }
                ]
            }
        },
        methods: {
            getTranslatedText(name, string) {
                return this.$options.filters.t("_" + name + "_" + string, string);
            },
            save: function() {
                let parent = this;

                api.setThemeConfig(this.$root.$data.domain, this.theme.config.name, this.currentConfig).then(function() {
                    parent.theme.getComputedTemplate(parent.$root.$data.domain).then(template => {
                        api.updateFile(template, parent.$root.$data.domain, "index.html", true).then(response => {
                            alert("Theme files deployed");
                        });
                    });
                });
            },
            addEmptyGroupEntry: function(group) {
                let fields = {},
                    temp = this.currentConfig[group.name];

                group.fields.forEach((f, i) => {
                    fields[f.name] = f.type !== "file" ? "" : {};
                });

                // This is a hack to make vue recognise array changes as reactive updates
                this.$set(this.currentConfig[group.name], temp.length, fields);
            },
            removeGroupEntry: function(configGroups, index) {
                configGroups.splice(index, 1);
            },
            processFileInput: function(event, group) {
                let parent = this,
                    reader = new FileReader();
                reader.readAsArrayBuffer(event.target.files[0]);

                reader.onload = function (evt) {
                    api.updateRawFile(evt.target.result, parent.$root.$data.domain, Math.random().toString(36).substr(2, 10), false).then(result => {
                        group.xorurl = result[1][Object.keys(result[1])[0]][1];
                        group.mime = event.target.files[0].type;

                        parent.$forceUpdate()
                    })
                };

                reader.onerror = function (evt) {
                    alert("Unable to read file from local file system");
                };
            }
        },
        mounted() {
            let parent = this;
            api.getTheme(this.$root.$data.domain).then(theme => {
                parent.theme = theme;

                api.getThemeConfig(this.$root.$data.domain, theme.config.name).then(config => {
                    theme.config.config.forEach((c, i) => {
                        if (!(c.name in config)) {
                            config[c.name] = c.count === "multi" ? [] : {};

                            if (c.count === "single") {
                                c.fields.forEach((f, v) => {
                                    config[c.name][f.name] = f.type !== "file" ? "" : {};
                                });
                            }
                        }
                    });

                    parent.currentConfig = config;
                    parent.loaded = true;
                });
            });
        }
    }
</script>

<style scoped lang="scss">
    .config {
        margin-top: 30px;
        padding: 20px;
        background-color: #fff;

        form {
            margin: 0;
            width: 100%;
            padding: 0;
            background-color: transparent;
        }

        .config-item {
            padding-bottom: 20px;

            &:last-child {
                padding-bottom: 0;
            }

            .name {
                font-weight: bold;
                text-transform: capitalize;
            }

            .description {
                padding: 5px 0 10px 0;
                font-size: 13px;
                opacity: .8;
            }

            .fields {
                position: relative;
                background-color: #f2f5f6;
            }

            .remove {
                position: absolute;
                top: 0;
                right: 10px;
                font-size: 24px;
                font-weight: bold;
                opacity: .8;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }
            }

            .field {
                display: inline-block;
                vertical-align: top;
                width: 50%;
                padding: 10px;
            }

            .button {
                margin-top: 10px;
            }

            input {
                margin-bottom: 0;
            }

            .file-data {
                padding-top: 5px;
                opacity: .75;
            }
        }
    }

    @media (max-width: 767px) {
        .config {
            .config-item {
                .file-data {
                    a {
                        word-break: break-all;
                    }
                }

                .fields {
                    border-top: 1px solid #e6e6e6;

                    &:nth-child(3) {
                        border-top: none;
                    }
                }

                .field {
                    width: 100%;
                }
            }
        }
    }
</style>