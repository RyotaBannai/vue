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

