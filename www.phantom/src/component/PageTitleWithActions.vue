<template>
    <div class="title">
        <h2>
            {{ title }}
            <div class="actions" v-if="actions && actions.length">
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
            actions: Array
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
</style>