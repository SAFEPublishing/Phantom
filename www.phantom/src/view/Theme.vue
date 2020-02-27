<template>
    <div>
        <PageTitleWithActions title="Theme Configuration" :actions="actions" />
        <Loader v-if="!theme" text="Loading theme from cache" />
        <div v-if="theme" class="config">
            <form class="default">
            <div v-for="config in theme.config.config" class="config-item">
                <div class="name">{{ config.name | idToReadableString }}</div>
                <div class="description">{{ config.description }}</div>
                <div class="fields" v-if="config.count === 'multi'" v-for="(fieldGroup, index) in currentConfig[config.name]">
                    <div class="remove" @click="removeGroupEntry(currentConfig[config.name], index)">&times;</div>
                    <div v-for="field in config.fields" class="field">
                        <div class="name">{{ field.name | idToReadableString }}</div>
                        <div class="description">{{ field.description }}</div>
                        <input :type="field.type" v-model.lazy="fieldGroup[field.name]" />
                    </div>
                </div>
                <div class="button" v-if="config.count === 'multi'" @click="addEmptyGroupEntry(config)">Add</div>
                <div class="fields" v-if="config.count === 'single'">
                    <div v-for="field in config.fields" class="field">
                        <div class="name">{{ field.name | idToReadableString }}</div>
                        <div class="description">{{ field.description }}</div>
                        <input :type="field.type" v-model.lazy="currentConfig[config.name][field.name]" />
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
                actions: [
                    { text: "Save", callback: this.save }
                ]
            }
        },
        methods: {
            save: function() {
                api.setThemeConfig(this.$root.$data.domain, this.theme.config.name, this.currentConfig).then(function() {
                    alert("updated")
                });
            },
            addEmptyGroupEntry: function(group) {
                let fields = {},
                    temp = this.currentConfig[group.name];

                group.fields.forEach((f, i) => {
                    fields[f.name] = "";
                });

                // This is a hack to make vue recognise array changes as reactive updates
                this.$set(this.currentConfig[group.name], temp.length, fields);
            },
            removeGroupEntry: function(configGroups, index) {
                configGroups.splice(index, 1);
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
                        }
                    });

                    parent.currentConfig = config;
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
        }
    }
</style>