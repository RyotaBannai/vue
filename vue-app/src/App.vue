<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/layout/Header";
  export default {
    name: "app",
    components: {
      Header
    },
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    /*color: #2c3e50;*/
    color: white;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>

