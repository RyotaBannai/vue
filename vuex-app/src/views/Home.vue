<template>
  <div class="home">
    <Todos/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Counter from '@/components/Counter.vue'
// import CounterMap from '@/components/CounterMap.vue'
import Todos from '@/components/Todos.vue'

export default {
  name: 'Home',
  components: {
    Todos
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
    border-bottom: 1px solid #aaa;
  }
  /*  display: inline-block;*/
  /*  margin: 0 10px;*/
  /*}*/
  a {
    color: #42b983;
  }
</style>

