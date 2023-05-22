const selectedStore = {
    namespaced: true,
    state: {
        items: [],
    },
    getters: {},
    mutations: {
        CREATE_ITEM(state, selectedItem) {
            state.items.push(selectedItem);
            console.log(state.items);
        },
        DELETE_ITEM(state, selectedItem) {
            const index = state.items.indexOf(selectedItem);
            state.items.splice(index, 1);
        }
    },
    actions: {
        createItem({commit}, selectedItem) {
            commit("CREATE_ITEM", selectedItem);
        },
        deleteItem({ commit }, selectedItem) {
            commit("DELETE_ITEM", selectedItem);
        },
    },
}

export default selectedStore;