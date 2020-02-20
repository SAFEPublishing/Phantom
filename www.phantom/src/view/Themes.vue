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
                    <div v-if="theme.config.name !== activeTheme" class="button">Install</div>
                </div>
                <div v-if="theme.config.name === activeTheme" class="active">This theme is currently installed</div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from "@/component/Loader";
    import Light from '@/service/theme/light.json';
    import Theme from '@/service/theme/theme';
    import api from "@/service/safe/api";

    export default {
        name: 'themes',
        components: {
            PageTitleWithActions,
            Loader
        },
        data: function() {
            return {
                themes: [new Theme(Light)],
                activeTheme: false,
                actions: []
            }
        },
        methods: {
            compileTheme: function() {

            }
        },
        mounted() {
            api.getTheme(this.$root.$data.domain).then(theme => {
                this.activeTheme = theme;
            })
        }
    }
</script>

<style scoped lang="scss">
    .themes {
        padding-top: 20px;

        .theme {
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