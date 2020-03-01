<template>
    <DocumentEdit single="Post" plural="Posts" urlPrefix="/post" />
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