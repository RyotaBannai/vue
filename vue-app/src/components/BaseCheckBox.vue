<template>
    <div>
        <input
            type="checkbox"
            v-bind:checked="checked"
            v-on:change="$emit('change', $event.target.checked)">
    </div>
</template>

<script>
    export default {
        name: "BaseCheckBox",
        model: {
            prop: 'checked',
            event: 'change'
        },
        props: {
            checked: Boolean
        },
    }
</script>

<style scoped>

</style>