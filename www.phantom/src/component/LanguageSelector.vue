<template>
    <div class="language-selector">
        <div class="language-current" @click="toggleLocales">{{ locales[$root.$data.locale] }}</div>
        <div class="language-list" v-if="showLocales">
            <div class="language" v-for="(locale, i) in locales" @click="setLocale(i)">{{ locale }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'language-selector',
        data() {
            return {
                showLocales: false,
                locales: this.$root.$data.localeNames
            }
        },
        methods: {
            setLocale: function(code) {
                this.$root.$data.locale = code;
                this.toggleLocales();
            },
            toggleLocales: function() {
                this.showLocales = !this.showLocales;
            }
        }
    }
</script>

<style scoped lang="scss">
    .language-selector {
        position: relative;
        display: block;
        width: 100%;

        .language-current {
            display: inline-block;
            padding: 5px;
            width: 100%;
            font-weight: bold;
            border: 2px solid #2d6cad;
            cursor: pointer;
        }

        .language-list {
            position: absolute;
            bottom: 100%;
            width: 100%;
            border: 2px solid #2d6cad;
            border-bottom: none;
            background-color: #fff;
            color: #000;
            z-index: 254;

            .language {
                padding: 5px;
                border-bottom: 1px solid #e1e1e1;
                overflow: hidden;
                word-break: break-all;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;

                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
</style>