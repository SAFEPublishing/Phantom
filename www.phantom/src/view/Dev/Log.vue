<template>
    <div>
        <PageTitleWithActions :title="'event_log' | t" :actions="actions" />
        <Loader v-if="!logs" text="Loading logs from cache" />
        <table v-if="logs">
            <thead>
                <tr>
                    <th>{{ 'event' | t }}</th>
                    <th>{{ 'information' | t }}</th>
                    <th>{{ 'created' | t }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="logs && !logs.length">
                    <td colspan="5">{{ 'no_events' | t }}</td>
                </tr>
                <tr v-for="log in logs">
                    <td>
                        <div class="column">{{ 'event' | t }}</div>
                        {{ log.name }}
                    </td>
                    <td>
                        <div class="column">{{ 'information' | t }}</div>
                        {{ log.info }}
                    </td>
                    <td>
                        <div class="column">{{ 'created' | t }}</div>
                        {{ log.created }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from '@/component/Loader';
    import logger from "@/service/log/logger";

    export default {
        name: 'log',
        data() {
            return {
                logs: false,
                actions: [
                    { text: this.$options.filters.t("delete"), callback: this.clearEvents }
                ]
            }
        },
        components: {
            PageTitleWithActions,
            Loader
        },
        methods: {
            clearEvents: function() {
                let parent = this;
                logger.clear().then(events => {
                    parent.logs = events;
                })
            }
        },
        mounted() {
            logger.getEvents().then(events => {
                this.logs = events;
            })
        }
    }
</script>

<style scoped lang="scss">

</style>