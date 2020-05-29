<script>
import MyComponent from "./MyComponent";

export default {
    data(){
        return {
            message: 'Hello World',
            isActive: true,
            isFalse: false,
            title: 'Render function',
            text: 'my text'
        }
    },
    render: function(createElement){
        return createElement(
            'div',
            {
                class: {
                    foo: this.isActive,
                    bar: this.isFalse
                },
                // スロットを組み込みたい場合
                // scopedSlots: {
                //     default: props => createElement('span', props.text)
                // },
            },
            [
                this.message,
                createElement('h3', 'A headline'),
                createElement(MyComponent, {
                    props: {
                        someProp: 'foobar', // pass the props

                    }
                })
            ],
        )
    }
}
</script>