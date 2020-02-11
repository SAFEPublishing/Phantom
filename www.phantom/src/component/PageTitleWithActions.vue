<template>
    <div class="title">
        <h2>
            {{ title }}
            <div class="actions">
                <div v-for="action in actions" class="action" @click="action.callback">{{ action.text }}</div>
            </div>
        </h2>
    </div>
</template>

<script>
    export default {
        name: 'PageTitleWithActions',
        props: {
            title: String,
            actions: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style scoped lang="scss">
    h2 {
        margin: 0;
        font-size: 22px;
        font-weight: bold;
    }

    .title {
        min-height: 35px;
    }

    .actions {
        float: right;
        font-size: 13px;

        .action {
            cursor: pointer;
            margin-left: 10px;
            padding: 10px 20px;
            color: #fff;
            background: #2a1646;
            background: linear-gradient(0deg, #2a1646 0%, #44276e 100%);
            box-shadow: inset 0 0 5px #2a1646;
            text-shadow: 0 1px 3px #2a1646;
            border-radius: 5px;

            &:hover {
                background: linear-gradient(0deg, #432370 0%, #4b2b7a 100%);
            }
        }
    }
</style>