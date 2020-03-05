<template>
    <div class="footer">
        <div class="home-wrapper">
            <div class="left">
                {{ 'footer_about' | t }}
                <div class="links">
                    <div class="heading">{{ 'footer_links' | t }}</div>
                    <div class="link"><a href="https://github.com/SAFEPublishing/Phantom">{{ 'footer_github' | t }}</a></div>
                    <div class="link"><a href="https://safenetforum.org/t/phantom-a-publishing-tool-enabling-users-of-the-safe-network-to-easily-manage-websites/31093">{{ 'footer_forum' | t }}</a></div>
                </div>
            </div>
            <div class="right">
                {{ 'footer_liability' | t }}
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from '@/component/Logo';

    export default {
        name: 'foot',
        components: {
            Logo
        }
    }
</script>

<style scoped lang="scss">
    .footer {
        margin-top: 20px;
        padding: 40px 0;
        background-color: #54308a;
        color: #fff;

        .left, .right {
            display: inline-block;
            vertical-align: top;
        }

        .left {
            width: 35%;
            margin-right: 15%;

            .links {
                padding-top: 20px;

                .heading {
                    font-weight: bold;
                }

                .link {
                }
            }
        }

        .right {
            width: 50%;
        }

        a {
            font-weight: bold;
            color: #9ec6f1;
        }
    }

    @media (max-width: 767px) {
        .footer {
            padding-bottom: 30px;
            
            .left, .right {
                display: block;
                width: 100%;
                padding-bottom: 20px;
                margin-right: 0;
            }
        }
    }
</style>