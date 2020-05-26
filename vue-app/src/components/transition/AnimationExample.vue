<template>
    <div>
        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">

        <div id="example-3">
            <button @click="show = !show">
                Toggle render
            </button>
            <transition
                    name="custom-classes-transition"
                    enter-active-class="animated tada"
                    leave-active-class="animated bounceOutRight"
            >
                <p v-if="show">hello</p>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AnimationExample",
        data () {
            return{
                show: true
            }

        }
    }
</script>

<style scoped>

</style>