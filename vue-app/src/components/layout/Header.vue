<template>
    <header class="header">
        <h1>Todo List</h1>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/playground">Playground</router-link> |
            <router-link to="/pg2">Playground2</router-link> |
            <router-link to="/pg3">Playground3</router-link> |
            <router-link to="/pg4">Playground4</router-link> |
            <router-link to="/pg5">Playground5</router-link> |
            <router-link :to="{name:'post-id', params: {id: 1}}">Post</router-link>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .header{
        background:#333;
        color:#777;
        text-align: center;
        padding:10px;
    }
    .header a {
        color: #fff;
        padding-right:5px;
        text-decoration: none;
    }
</style>