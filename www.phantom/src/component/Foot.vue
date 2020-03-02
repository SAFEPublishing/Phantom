<template>
    <div class="footer">
        <div class="home-wrapper">
            <div class="left">
                This project was lovingly created by Shane Armstrong for the SAFE Network community.
                <div class="links">
                    <div class="heading">Warning: The following links are on the clearnet</div>
                    <div class="link"><a href="https://github.com/SAFEPublishing/Phantom">Phantom Github repository</a></div>
                    <div class="link"><a href="https://safenetforum.org/t/phantom-a-publishing-tool-enabling-users-of-the-safe-network-to-easily-manage-websites/31093">Phantom SAFE forum page</a></div>
                </div>
            </div>
            <div class="right">
                This project will always remain on the SAFE network address <a href="safe://phantom">safe://phantom</a>, Phantom delivered from any other SAFE network address is not endorsed or supported by us in any way.
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