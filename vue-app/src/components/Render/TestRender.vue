<script>
import MyComponent from "./MyComponent";

export default {
    data(){
        return {
            message: 'Hello World',
            isActive: true,
            isFalse: false,
            title: 'Render function',
        }
    },
    render: function(createElement){
        return createElement(
            'h1',
            {
                class: {
                    foo: this.isActive,
                    bar: this.isFalse
                }
            },
            [
                this.message,
                createElement('h3', 'A headline'),
                createElement(MyComponent, {
                    props: {
                        someProp: 'foobar' // pass the props
                    }
                })
            ])
    }
}
</script>