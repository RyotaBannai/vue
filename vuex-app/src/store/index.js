import Vue from 'vue'
import Vuex from 'vuex'
import todos from '@/store/modules/todos.js'
import count from '@/store/modules/count.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    count: count,
    todos: todos,
  }
})