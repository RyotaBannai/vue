<template>
  <div>
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
    <AddTodo v-on:add-todo="addTodo"/>
  </div>
</template>

<script>

  import Todos from "../components/Todos";
  import AddTodo from "../components/AddTodo";

  import axios from "axios"

  export default {
    name: 'App',
    components: {
        AddTodo,
        Todos,
    },
    data() {
      return {
        todos: [
        ]
      }
    },
    computed: {
      username() {
        return this.$route.params.username
      }
    },
    methods: {
      deleteTodo(id) {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          mode: 'cors'
        })
                .then(() => this.todos = this.todos.filter(todo => todo.id !== id))
                .catch(err => console.log(err));
      },
      addTodo(newTodo) {
        const {title, completed} = newTodo;
        axios.post('https://jsonplaceholder.typicode.com/todos', {
          title,
          completed,
        })
                .then(res => this.todos = [...this.todos, res.data])
                .catch(err => console.log(err));
      }
    },
    created(){
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
              .then(res => this.todos = res.data)
              .catch(err => console.log(err));
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
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

  .btn {
    display: inline-block;
    border:none;
    background: #555;
    padding: 7px 20px;
    cursor: pointer;
  }
  .btn:hover{
    background: #666;
  }
</style>
