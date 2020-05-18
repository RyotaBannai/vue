<template>
    <div class="todo-item" v-bind:class="{'is-complete': todo.completed}">
        <input type="checkbox" v-on:change="markComplete" :checked="todo.completed" >
        <span>{{todo.title}}</span>
        <button @click="$emit('del-todo', todo.id)" class="del">x</button>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: ["todo"],
        methods: {
            markComplete() {
                this.todo.completed = !this.todo.completed; // access to property.
            },
        }
    }
</script>

<style scoped>
    .todo-item{
        background: #f4f4f4;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }
    .is-complete{
        text-decoration: line-through;
    }
    is-checked{

    }
    .del{
        background: #ff0000;
        color: white;
        border:none;
        padding:5px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }
</style>