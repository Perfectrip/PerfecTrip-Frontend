const hotPlaceStore = {
    namespaced: true,
    state: {
        contentId: null,
        placeInfo: null,
    },
    getters: {},
    mutations: {
        setValue(state, payload) {
            state.contentId = payload.contentId;
            state.placeInfo = payload;
        },
        resetState(state) {
            state.contentId = null;
            state.placeInfo = null;
        }
    },
    actions: {
        updateValue({ commit }, payload) {
            commit('setValue', payload);
        },
        resetStore({ commit }) {
            commit('resetState');
          },
    },
  };
  
  export default hotPlaceStore;