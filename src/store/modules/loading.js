export const namespaced = true;

export const state = {
  loading: false
};

export const mutations = {
  LOAD(state) {
    state.loading = true;
  },
  DONE(state) {
    state.loading = false;
  }
};

export const actions = {
  globalLoading({ commit }) {
    commit("LOAD");
  },
  globalLoadingDone({ commit }) {
    commit("DONE");
  }
};

export const getters = {};
