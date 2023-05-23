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
        },
        DELETE_ALL(state) {
            state.items.splice(0, state.items.length);
            console.log(state.items);
        }
    },
    actions: {
        createItem({commit}, selectedItem) {
            commit("CREATE_ITEM", selectedItem);
        },
        deleteItem({ commit }, selectedItem) {
            commit("DELETE_ITEM", selectedItem);
        },
        deleteAll({ commit }, selectedItem) {
            commit("DELETE_ALL", selectedItem);
        }
    },
}

export default selectedStore;