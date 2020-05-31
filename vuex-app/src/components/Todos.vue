<template>
    <div class="hello">
        <ul>
            <li v-for="item in items" v-bind:key="item.id">
                <p>{{ item.text }}</p>
                <span>{{ done(item.done) }}</span>
            </li>
            <TodoSubmit v-on:add-item="addItem"></TodoSubmit>
        </ul>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from "vuex"
    import TodoSubmit from "./TodoSubmit";
    import { v4 as uuidv4 } from 'uuid';

    export default {
        name: 'Todos',
        components: { TodoSubmit },
        data () { return { msg: 'Todo App',} },
        computed: {
            ...mapState("todos", {
                    items: state => state.items,
                }),
        },
        watch: {
            items: function() {
                console.log(this.items);
            }
        },
        methods: {
            ...mapGetters("todos", [
                'getAll'
            ]),
            ...mapActions("todos", [
                'callAdd',
            ]),
            getCurrentValue: function() {
                console.log(this.getAll());
            },
            done: (done) => {
                if(done) return 'Done'
                else return 'Not Done'
            },
            addItem: function(text) {
                let payload = {
                    id: uuidv4(),
                    text: text,
                    done: false,
                }
                console.log(payload);
                //this.$store.dispatch("todos/callAdd");
                this.callAdd(payload)
            },
        }
    }
</script>