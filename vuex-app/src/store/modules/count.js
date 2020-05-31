const state = {
    count: 0
};

const count = {
    namespaced: true,
    state,
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        // incrementIfOddOnRootSum ({ state, commit, rootState }) {
        //     if ((state.count + rootState.count) % 2 === 1) {
        //         commit('increment')
        //     }
        // }
        increment (context) {
            context.commit('increment')
        }
    },
    getters: {
        countValue (state) {
            return state.count
        }
    }
}
export default count