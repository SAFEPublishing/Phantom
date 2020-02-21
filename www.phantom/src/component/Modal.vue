<template>
    <div class="modal-container">
        <div class="modal">
           <div class="modal-content">
               <slot></slot>
           </div>
            <div class="actions">
                <div v-for="action in actions" class="action" @click="action.callback">{{ action.text }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
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
    .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);

        .modal {
            position: absolute;
            top: 10%;
            left: calc(50% - 200px);
            width: 400px;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;

            form {
                width: 100%;
                margin: 0;
                padding: 0;
            }
        }
    }
</style>