import { TokenHelper } from "../../helpers/tokenHelper.js";
import authConfig from "../../config/auth.json";
import axios from "axios";

export const namespaced = true;

// eslint-disable-next-line no-unused-vars
const helpers = {};

export const state = {
  isAuthenticated: false,
  user: {},
  token: ""
};

export const mutations = {
  LOGIN(state, values) {
    console.log(values);
    state.isAuthenticated = true;
    state.user = values.user;
    state.token = values.token;
    localStorage.setItem("user", values.user);
    localStorage.setItem("token", values.token);
  },
  LOGOUT(state) {
    state.isAuthenitcated = false;
    state.user = {};
    state.token = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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

  logout() {
    this.isAuthenitcated = false;
    this.token = false;
    this.user = {};
    localStorage.removeItem("user");
  },

  loginOnRefresh({ commit }) {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    return new Promise(resolve => {
      if (!!user && !!token) {
        let valid = new TokenHelper(token).checkValidity();
        if (valid) {
          commit("LOGIN", {
            user: user,
            token: token
          });
          resolve("Login successful!");
        } else {
          throw new Error("Toke not valid!");
        }
      } else {
        throw new Error("Storage empty!");
      }
    });
  }
};

export const getters = {};
