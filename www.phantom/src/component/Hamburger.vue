<template>
    <div class="hamburger" @click="click">
        <div class="bar"></div>
    </div>
</template>

<script>
    export default {
        name: 'Hamburger',
        props: {
            click: Function
        }
    }
</script>

<style scoped lang="scss">
    .hamburger {
        display: inline-block;
        height: 20px;
        width: 30px;
        cursor: pointer;

        .bar {
            position: relative;
            width: 100%;
            height: 4px;
            background-color: #2d6cad;

            &:after, &:before {
                position: absolute;
                display: block;
                content: "";
                width: 100%;
                height: 4px;
                left: 0;
                background-color: #2d6cad;
            }

            &:after {
                top: 8px;
            }

            &:before {
                top: 16px;
            }
        }
    }
</style>