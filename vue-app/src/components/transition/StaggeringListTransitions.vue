<template>
    <div id="staggered-list-demo">
        <input v-model="query">
        <transition-group
                name="staggered-fade"
                tag="ul"
                v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave">
            <li
                    v-for="(item, index) in computedList"
                    v-bind:key="item.msg"
                    v-bind:data-index="index">{{ item.msg }}</li>
        </transition-group>
    </div>
</template>

<script>
    import Velocity from 'velocity-animate'
    export default {
        name: "StaggeringListTransitions",
        data() {
            return {
                query: '',
                list: [
                    { msg: 'Bruce Lee' },
                    { msg: 'Jackie Chan' },
                    { msg: 'Chuck Norris' },
                    { msg: 'Jet Li' },
                    { msg: 'Kung Fury' }
                ]
            }
        },
        computed: {
            computedList: function () {
                var vm = this;
                return this.list.filter(function (item) {
                    // indexOf returns index of character in the string.
                    // if the char isn't in the string, then this f returns
                    // if query is '' then all returns 0, thus all shows up
                    return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
                })
            }
        },
        methods: {
            beforeEnter: function (el) {
                el.style.opacity = 0;
                el.style.height = 0;
            },
            enter: function (el, done) {
                var delay = el.dataset.index * 150; // data-index にバインドするとインデックスも取れる
                setTimeout(function () {
                    Velocity(
                        el,
                        {opacity: 1, height: '1.6em'},
                        {complete: done} // Ensure a function is called only once.
                    )
                }, delay)
            },
            leave: function (el, done) {
                var delay = el.dataset.index * 150;
                setTimeout(function () {
                    Velocity(
                        el,
                        {opacity: 0, height: 0},
                        {complete: done}
                    )
                }, delay)
            }
        }
    }
</script>

<style scoped>

</style>