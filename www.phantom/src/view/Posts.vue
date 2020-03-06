<template>
    <DocumentList single="post" plural="posts" urlPrefix="/post" />
</template>

<script>
    import DocumentList from "@/component/DocumentList";

    export default {
        name: 'posts',
        components: {
            DocumentList
        }
    }
</script>