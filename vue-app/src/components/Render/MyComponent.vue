<script>
    export default {
        name: "MyComponent",
        data(){ return {} },
        props: {
            someProp: String,
        },
        render: function(createElement){
            return createElement(
                'p',
                { class: {} },
                this.someProp,
            )
        }
    }
</script>