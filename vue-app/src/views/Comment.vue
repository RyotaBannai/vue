<template>
    <div id="first-nested-component">
        <pre>this is a <i>nested route</i> area.</pre>
        thank you for your comments!
    </div>
</template>

<script>
    export default {
        name: "Comment"
    }
</script>

<style scoped>
    #first-nested-component{
        padding:10px;
        background-color: whitesmoke;
        border: 1px #42b983 solid;
        border-radius: 2px;
    }
</style>