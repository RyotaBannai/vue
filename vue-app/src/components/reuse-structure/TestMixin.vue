<template>
    <div></div>
</template>

<script>
    var mixin = {
        data: function () {
            return {
                message: 'hello',
                foo: 'abc'
            }
        },
        created: function () {
            console.log('mixin hook called')
        }
    };

    export default {
        name: "TestMixin",
        mixins: [mixin],
        data: function () {
            return {
                message: 'goodbye',
                bar: 'def'
            }
        },
        created: function () {
            console.log('components hook called')
            console.log(this.$data)
            // => { message: "goodbye", foo: "abc", bar: "def" } // component のデータが優先される。
        }
    }
</script>

<style scoped>


</style>