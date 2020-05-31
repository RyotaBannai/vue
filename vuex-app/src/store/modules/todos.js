const state = {
    items: [
        { id: 1, text: 'laundry', done: true },
        { id: 2, text: 'study', done: true },
        { id: 3, text: 'shopping', done: false },
    ]
};

const todos = {
    namespaced: true,
    state,
    mutations: {
        add (state, todo) {
            state.items.push(todo)
        }
    },
    actions: {
        callAdd ({commit}, payload) { // context は全部のプロパティ use object destructing way..
            commit('add', payload)
        }
    },
    getters: {
        getAll (state) {
            return state.items
        }
    }
}
export default todos