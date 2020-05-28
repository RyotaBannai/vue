<template>
    <div>
        <input v-focus>
        <p>Scroll down the page</p>
        <p v-pin="500">Stick me 200px from the top of the page</p>
        <p v-pin2:[direction]="400">Stick me 200px from the top of the page</p>
    </div>

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
            // console.log('mixin hook called')
        }
    };

    export default {
        name: "TestMixin",
        mixins: [mixin],
        data: function () {
            return {
                message: 'goodbye',
                bar: 'def',
                direction: 'left'
            }
        },
        created: function () {
            // console.log('components hook called')
            // console.log(this.$data)
            // => { message: "goodbye", foo: "abc", bar: "def" } // component のデータが優先される。
        },
        directives: {
            focus: {
                // ディレクティブ定義
                inserted: function (el) {
                    el.focus()
                }
            },
            pin: {
                bind: function (el, binding) {
                    el.style.position = 'fixed';
                    el.style.top = binding.value + 'px';
                }
            },
            pin2: {
                inserted: function (el, binding) {
                    console.log(binding);
                },
                bind: function (el, binding) {
                    el.style.position = 'fixed';
                    let s = (binding.arg == 'left' ? 'left' : 'top');
                    el.style[s] = binding.value + 'px'
                }
            }
        }
    }
</script>

<style scoped>


</style>