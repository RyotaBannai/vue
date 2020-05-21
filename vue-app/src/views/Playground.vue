<template>
    <div>
        <Button></Button>
        <CustomField>
            <template v-slot:main>
                <p>this is named and scoped slot!</p>
            </template>
        </CustomField>
    </div>
</template>

<script>
    import Button from "../components/Button";
    import CustomField from "../components/layout/CustomField";
    export default {
        name: "Playground",
        components: {
            Button,
            CustomField,
        }
    }
</script>

<style scoped>

</style>