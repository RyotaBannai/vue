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
        <hr>
        <ul>
            <template >
                <li v-for="item in items" v-bind:key="item.message">{{ item }}</li>
                <li class="divider" role="presentation"></li>
            </template>
        </ul>
        <span>Multiline message is:</span>
        <p style="white-space: pre-line;">{{ message }}</p>
        <br>
        <textarea v-model.lazy="message" placeholder="add multiple lines"></textarea>
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
                    {'message': 'ni hao'},
                    ],
                name: 'ryota',
                message: '',
            }
        },
        mounted: function() {
            console.log(this.$attrs);
            console.log(this.$el);
            console.log(this.$ref);
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