import { TokenHelper } from "../../helpers/tokenHelper.js";
import authConfig from "../../config/auth.json";
import axios from "axios";
import * as storage from "@/services/storage.js";

export const namespaced = true;

// eslint-disable-next-line no-unused-vars
const helpers = {};

export const state = {
  authenticated: false,
  user: {},
  token: ""
};

export const mutations = {
  LOGIN(state, values) {
    state.authenticated = true;
    state.user = values.user;
    state.token = values.token;
    storage.local.setItem("user", values.user);
    storage.local.setItem("token", values.token);
  },
  LOGOUT(state) {
    state.isAuthenitcated = false;
    state.user = {};
    state.token = null;
    storage.local.removeItem("user");
    storage.local.removeItem("token");
  }
};

export const actions = {
  // eslint-disable-next-line no-unused-vars
  login({ commit }, values) {
    let username = values.username;
    let password = values.password;

    return new Promise((resolve, reject) => {
      axios
        .post(authConfig.server + authConfig.auth, {
          identifier: username,
          password: password
        })
        .then(response => {
          let user = response.data.user;
          let token = response.data.jwt;
          commit("LOGIN", {
            user: user,
            token: token
          });
          resolve("Login sucess!");
        })
        .catch(error => {
          if (error.message === "Network Error") {
            let server = authConfig.server;
            this.dispatch("connection/connectionLost", server, { root: true });
          } else {
            if (error.message.includes("400")) {
              reject("Bad Credentials!");
            } else {
              reject("Unknown error!");
            }
          }
        });
    });
  },

  logout({ commit }) {
    commit("LOGOUT");
  },

  loginOnRefresh({ commit }) {
    let user = storage.local.getItem("user");
    let token = storage.local.getItem("token");

    return new Promise(resolve => {
      if (!!user && !!token) {
        try {
          new TokenHelper(token).checkValidity();
        } catch (error) {
          throw error;
        }
        commit("LOGIN", {
          user: user,
          token: token
        });
        resolve("Login successful!");
      } else {
        throw new Error("Storage empty!");
      }
    });
  }
};

export const getters = {};
