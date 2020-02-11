<template>
    <div class="root">
        <div class="app" v-if="$root.$data.authenticated">
            <Sidebar />
            <div class="content">
                <router-view/>
            </div>
        </div>
        <div class="home" v-if="!$root.$data.authenticated">
            <div class="menu">
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link href="/login">Login</router-link>
            </div>
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from '@/component/Sidebar.vue';
    import api from '@/service/safe/api';

    export default {
        name: 'app',
        components: {
            Sidebar,
        },
        mounted: function () {
            api.authenticate().then(response => {
                this.$root.$data.authenticated = response;

                api.getCurrentDomain().then(domain => {
                    this.$root.$data.domain = domain;
                });
            });
        },
    }
</script>

<style lang="scss">
    // The styles contained here are unscoped and will apply globally to components

    @mixin button {
        display: inline-block;
        cursor: pointer;
        padding: 10px 20px;
        color: #fff;
        background: #2a1646;
        background: linear-gradient(0deg, #2a1646 0%, #44276e 100%);
        box-shadow: inset 0 0 5px #2a1646;
        text-shadow: 0 1px 3px #2a1646;
        border: none;
        border-radius: 5px;

        &:hover {
            background: linear-gradient(0deg, #432370 0%, #4b2b7a 100%);
        }
    }

    .button {
        @include button;
    }

    .app .content {
        padding: 40px 40px 40px 280px;
    }

    table {
        width: 100%;
        margin: 30px 0;
        border-collapse: collapse;
        border-spacing: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px #ddd;
        overflow: hidden;

        thead {
            color: #e9e3ef;
            background: linear-gradient(0deg, #432370 0%, #4b2b7a 100%);
        }

        tbody {
            background-color: #fff;
        }

        th, td {
            text-align: left;
            border-spacing: 0;
            word-break: break-all;

            .button {
                word-break: keep-all;
            }
        }

        th {
            padding: 10px 20px;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
        }

        td {
            padding: 15px 20px;
            border-top: 1px solid #e6e6e6;
        }

        a {
            color: #54308a;
            font-weight: bold;
        }
    }

    .actions {
        float: right;
        font-size: 13px;

        .action {
            @include button;
            margin-left: 10px;
        }
    }

    form {
        input {
            font-family: 'OpenSans', Arial, sans-serif;
        }
    }

    form.default {
        width: 50%;
        margin: 30px 0;
        padding: 20px;
        background-color: #fff;

        label {
            display: block;
            padding-bottom: 5px;
            font-weight: bold;
        }

        .description {
            padding-bottom: 5px;
            opacity: .7;
            font-size: 12px;
        }

        input[type=text], input[type="tel"], input[type="email"], input[type="number"] {
            width: 100%;
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #bbb;
            border-radius: 5px;
        }

        input[type="submit"] {
            @include button;
        }
    }
</style>
