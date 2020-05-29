<script>
    export default {
        name: "MyComponent",
        data(){ return {} },
        props: {
            someProp: String,
        },
        methods: {
            clickHandler(event) {
                console.log(event);
            }
        },
        directives: {
            'my-custom-directive': {
                inserted: function () {
                    console.log('in directive')
                }
            },
        },
        render: function(createElement){
            return createElement(
                'p',
                {
                    class: {},
                    style: {
                        color: 'rebeccapurple',
                        fontSize: '14px',
                        cursor: 'pointer',
                    },
                    attrs: {
                        id: 'myId'
                    },
                    domProps: {
                        // innerHTML: 'baz' // this first priority
                    },
                    on: {
                        click: this.clickHandler
                    },
                    directives: [
                        {
                            name: 'my-custom-directive',
                            value: '2',
                            expression: '1 + 1',
                            arg: 'foo',
                            modifiers: {
                                bar: true
                            }
                        }
                    ],

                    // slot: 'default',

                },
                //this.$slots.default // ?
                 this.someProp, // this's the second priority
            )
        }
    }
</script>