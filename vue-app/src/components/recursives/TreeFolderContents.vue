<template >
    <div>
        <span v-for="child in children" v-bind:key="child.name">
            <tree-folder v-if="child.is_folder" :folder="child"/>
            <span v-else>・{{ child.name }}</span>
        </span>
    </div>
</template>

<script>
    import TreeFolder from "./TreeFolder";
    export default {
        name: "tree-folder-contents",
        props: {'children': Array},
        components: {TreeFolder}
    }
</script>

<style scoped>
    div {
        margin-left: 15px;
        background-color: lightcyan;
    }
</style>