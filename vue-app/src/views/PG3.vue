<template>
    <div>
        <base-check-box v-model="lovingVue"></base-check-box>
        <base-input v-on="$listeners" label="default" style="background-color: #42b983"></base-input>
    </div>
</template>

<script>
    import BaseCheckBox from '../components/BaseCheckBox'
    import BaseInput from '../components/BaseInput'
    export default {
        name: "PG3",
        data () {
            return {
                lovingVue: true, // or false
            }
        },
        components: {
            BaseCheckBox,
            BaseInput
            // 'base-check-box': BaseCheckBox // または明示的に。
        }
    }
    /*
    * lovingVue の値が checked プロパティに渡ります。
    *  <base-checkbox> が change イベントを新しい値で発火した時に lovingVue プロパティが更新されます。
    *
    * */
</script>

<style scoped>

</style>