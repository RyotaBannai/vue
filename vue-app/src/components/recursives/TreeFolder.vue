<template>
    <p>
        <span>{{ folder.name }}/</span>
        <tree-folder-contents :children="folder.children"/>
    </p>
</template>

<script>
    export default {
        name: "tree-folder",
        props:{'folder': Object},
        beforeCreate: function () {
            this.$options.components.TreeFolderContents = require('./TreeFolderContents.vue').default;
        },
        // または
        // components: {
        //     'tree-folder-contents': () => import('./TreeFolderContents.vue')
        // },
    }
</script>

<style lang="scss" scoped>
    p {
        span{
            background-color: #cccccc;
            display: block;
        }
    }
</style>