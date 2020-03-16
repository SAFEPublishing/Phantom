<template>
    <div>
        <PageTitleWithActions :title="'Dashboard' | t" />
        <div class="items">
            <div class="item welcome">
                <h1>Welcome to Phantom</h1>
                <p>We hope you enjoy using Phantom as much we do. Phantom is completely free, unencumbered and open source.</p>
                <p>If you have any feedback or want to contribute, you can find our Github repository here:<br /><br /><a target="_blank" href="https://github.com/SAFEPublishing/Phantom">https://github.com/SAFEPublishing/Phantom</a></p>
                <div class="warning">Warning: this is a clearnet link</div>
            </div>
            <div class="item">
                <h1>Security & update advisory</h1>
                <p>Any relevant information regarding the security or update status of the Phantom application or any websites created using phantom will be shown here:</p>
                <p class="nothing">Currently there are no security or update notifications relevant to your data</p>
            </div>
            <div class="item">
                <h1>Developer tools</h1>
                <p>Special Phantom pages just for developers (and nerds):</p>
                <div class="dev-links">
                    <router-link to="/app/log">{{ 'event_log' | t }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageTitleWithActions from "@/component/PageTitleWithActions";
    import Loader from '@/component/Loader';

    export default {
        name: 'dashboard',
        components: {
            PageTitleWithActions,
            Loader
        }
    }
</script>

<style scoped lang="scss">
    .items {
        margin-top: 10px;
    }

    .item {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        max-width: 500px;
        margin: 20px 20px 0 0;
        padding: 20px;
        background-color: #fff;

        h1 {
            margin: 0;
            font-size: 14px;
        }

        p {
            margin: 10px 0 0 0;
        }

        a {
            color: #54308a;
            font-weight: bold;
        }

        .warning {
            font-weight: bold;
        }
    }

    .welcome {
        display: block;
    }

    .nothing {
        font-weight: bold;
        font-style: italic;
    }

    .dev-links {
        margin-top: 10px;
        padding: 10px;
        background-color: #f2f5f6;

        a {
            margin-top: 5px;
            display: block;

            &:first-child {
                margin-top: 0;
            }
        }
    }
</style>