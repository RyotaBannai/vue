<template>
  <div class="home">
    <CounterMap/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Counter from '@/components/Counter.vue'
import CounterMap from '@/components/CounterMap.vue'

export default {
  name: 'Home',
  components: {
    CounterMap
  }
}
</script>

<style>
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

