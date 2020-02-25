<template>
    <div>
        <PageTitleWithActions title="Dashboard" />
        <p>The dashboard is coming soon, for now click on domains on the left to get started.</p>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";

    export default {
        name: 'dashboard',
        components: {
            PageTitleWithActions
        }
    }
</script>

<style scoped lang="scss">
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>