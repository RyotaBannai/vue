<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ count }}</div>
    <button v-on:click="increment">Increment</button>
    <button v-on:click="getCurrentValue">Get current value</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
  },
  data () {
    return {
      msg: 'Counter App',
    }
  },
  computed: {
    count () {
      return this.$store.state.count.count
    }
  },
  methods: {
    increment: function(){
      this.$store.commit("count/increment");
    },
    getCurrentValue: function(){
      let current_value = this.$store.getters["count/doubleCount"]
      console.log(current_value);
    }
  }
}
</script>
