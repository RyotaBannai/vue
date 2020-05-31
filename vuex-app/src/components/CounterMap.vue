<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div>{{ count }}</div>
        <button v-on:click="increment">Increment</button>
        <button v-on:click="getCurrentValue">Get current value</button>
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from "vuex"
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
            ...mapState("count", {
                count: state => state.count
            }),
        },
        methods: {
            // increment: function(){
            //     this.$store.commit("count/increment");
            // },
            // getCurrentValue: function(){
            //     let current_value = this.$store.getters["count/doubleCount"]
            //     console.log(current_value);
            // },
            ...mapActions("count", [
                    'increment',
                ],
            ),
            // Example of how to access namedspace actions
            // addProductItem(item) {
            //     return this.addProduct(item);
            // },
            ...mapGetters("count", [
                'countValue'
            ]),
            getCurrentValue() {
                console.log(this.countValue());
            }
        }
    }
</script>