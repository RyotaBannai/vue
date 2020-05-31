<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ count }}</div>
    <button v-on:click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {

  },
  // state
  data () {
    return {
      msg: 'Counter App',
      count: 0
    }
  },
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
