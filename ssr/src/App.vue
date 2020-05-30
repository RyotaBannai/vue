<template>
    <div>
        <div>App component</div>
        <li><router-link to="/">Home</router-link></li> |
        <li><router-link to="/about">About</router-link></li>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "App.vue"
    }
</script>

<style scoped>

</style>