<template>
    <label>
        {{ label }}
        <input
                v-bind="$attrs"
                v-bind:value="value"
                v-on="inputListeners"
        >
    </label>
</template>

<script>
    export default {
        name: "BaseInput",
        inheritAttrs: false,
        props: ['label', 'value'],
        computed: {
            inputListeners: function () {
                var vm = this
                // `Object.assign` が複数のオブジェクトを一つの新しいオブジェクトにマージします
                return Object.assign({},
                    // 親からの全てのリスナを追加します
                    this.$listeners,
                    // そしてカスタムリスナを追加したり
                    // すでに存在するリスナの振る舞いを変えることができます
                    {
                        // こうすることでコンポーネントが v-model と動作します
                        input: function (event) {
                            vm.$emit('input', event.target.value)
                        }
                    }
                )
            }
        },
    }
</script>

<style scoped>

</style>