<template>
    <div>
        <form>
            <input v-model="text" type="text" placeholder="Add todo item, for example 'run'">
            <button type="submit" @click="$emit('add-item', text)">Add Item</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "TodoSubmit",
        data() {
            return {
                text: '',
            }
        },
    }
</script>

<style scoped>

</style>