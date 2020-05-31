<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div>{{ countAlias }}</div>
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
            ...mapState("count", // ['count'], // マップされた算出プロパティの名前がステートサブツリーの名前と同じ場合
                {
                count: state => state.count,
                countAlias: 'count', // 文字列を渡すことは、`state => state.count` と同じ
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