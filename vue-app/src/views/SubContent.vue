<template>
    <div id="sub-content">
        this is the subcontent area.
        <p>Using v-html directive: <span v-html="rawHtml"></span></p>
        {{_call}}
    </div>
</template>

<script>
    export default {
        name: "SubContent",
        data() {
            return {
                rawHtml: '<span style="color:rebeccapurple">this is rawHTML!</span>',
                message: 'Hello'
            }
        },
        computed: {
            // 算出 getter 関数
            reversedMessage: function () {
                // `this` は vm インスタンスを指します
                return this.message.split('').reverse().join('')
            },
            _call: function () {
                console.log('called');
                return this.message;
            }
        },
        methods: {
            __call: function () {
                console.log('called');
                return this.message;
            }
        }
    }
</script>

<style scoped>
    #sub-content{
        padding:10px;
        background-color: #cccccc;
    }
</style>