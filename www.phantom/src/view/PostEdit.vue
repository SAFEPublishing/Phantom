<template>
    <DocumentEdit single="post" plural="posts" urlPrefix="/post" />
</template>

<script>
    import DocumentEdit from "@/component/DocumentEdit";

    export default {
        name: 'post-edit',
        components: {
            DocumentEdit
        }
    }
</script>