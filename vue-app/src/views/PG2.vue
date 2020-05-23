<template>
    <div id="example">
        <p>
            Choose advice number(1~217):
            <input v-model="answer">
        </p>
        <p>new advice： {{ newAdvice }}</p>
        <p>old advice： {{ oldAdvice }}</p>
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
            }
        },
        watch: {
            answer: function () {
                this.newAdvice = 'Loading...';
                // let vm = this;
                // setTimeout(function(){ vm.newAdvice='stay hungry, stay foolish.' }, 500);
                setTimeout(() => this.newAdvice='stay hungry, stay foolish.' , 500);
            },
        }
    }
</script>

<style scoped>

</style>