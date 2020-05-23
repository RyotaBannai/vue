<template>
    <div id="example">
        <p>
            Choose advice number(1~217):
            <input v-model="answer">
        </p>
        <p>new advice： {{ newAdvice }}</p>
        <p>old advice： {{ oldAdvice }}</p>
        <ul>
            <li v-for="(item, index) in items" :key="index">
                {{ item.message | addYourName(name) }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "PG2",
        data() {
            return {
                oldAdvice: 'get a govn job!',
                newAdvice: '',
                answer: '',
                items: [
                    {'message': 'hi'},
                    {'message': 'bonsoir'},
                    {'message': 'hi hao'},
                    ],
                name: 'ryota',
            }
        },
        filters: {
            addYourName: function(value, name) {
                return value +', '+ name
            }
        },
        watch: {
            answer: function () {
                this.newAdvice = 'Loading...';
                // let vm = this;
                // setTimeout(function(){ vm.newAdvice='stay hungry, stay foolish.' }, 500);
                setTimeout(() => this.newAdvice='stay hungry, stay foolish.' , 500);
            },
        },
        methods: {
            justReturn(value){
                return value;
            },
        }
    }
</script>

<style scoped>

</style>