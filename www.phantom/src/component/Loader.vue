<template>
    <div class="loader">
        <div class="ring"></div>
        <div class="text">{{ text }}...</div>
    </div>
</template>

<script>
    export default {
        name: 'Loader',
        props: {
            text: String
        }
    }
</script>

<style scoped lang="scss">
    .loader {
        margin: 20px 0;

        .text {
            display: inline-block;
            vertical-align: middle;
            padding: 20px 0 0 5px;
            font-weight: bold;
        }

        .ring {
            display: inline-block;
            vertical-align: middle;
            width: 45px;
            height: 24px;
        }

        .ring:after {
            content: "";
            display: block;
            width: 24px;
            height: 24px;
            margin: 8px;
            border-radius: 50%;
            border: 4px solid #2a1646;
            border-color: #2a1646 transparent #44276e transparent;
            animation: ring 1.5s ease-in-out infinite;
        }
        @keyframes ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>