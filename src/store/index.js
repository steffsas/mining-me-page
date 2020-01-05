import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user";
import * as loading from "@/store/modules/loading";
import * as connection from "@/store/modules/connection";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    loading,
    connection
  }
});
