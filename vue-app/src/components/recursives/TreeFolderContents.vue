<template>
    <ul>
        <li v-for="child in children">
            <tree-folder v-if="child.children" :folder="child"/>
            <span v-else>{{ child.name }}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "tree"
    }
</script>

<style scoped>

</style>