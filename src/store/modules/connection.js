import axios from "axios";

export const namespaced = true;

var connectionTimer = null;

export const state = {
  connectionLost: false
};

export const mutations = {
  CONNECTIONLOST(state) {
    state.connectionLost = true;
  },
  CONNECTIONREGAIN(state) {
    state.connectionLost = false;
  }
};

export const actions = {
  connectionLost({ commit, state }, server) {
    if (!state.connectionLost) commit("CONNECTIONLOST");
    if (!connectionTimer) {
      connectionTimer = setInterval(() => {
        axios
          .get(server)
          .then(() => {
            clearInterval(connectionTimer);
            commit("CONNECTIONREGAIN");
          })
          .catch(error => {
            console.log("No connection: ", error);
          });
      }, 5000);
    }
  }
};

export const getters = {};
