<template>
    <div id="post-main">
        <div>post details</div>
        <p>id: {{ $route.params.id }}</p>
        <router-view ></router-view>
        <router-view name="sub"></router-view>
    </div>
</template>

<script>
    export default {
        name: "Post"
    }
</script>

<style scoped>
    #post-main{
        padding: 10px;
        background-color: cornsilk;
    }
</style>