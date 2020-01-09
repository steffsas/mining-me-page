import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Notifications from "vue-notification";

// Vue config
Vue.config.productionTip = false;

// use notification in vue
Vue.use(Notifications);

// auto-login after page reload
store.dispatch("user/loginOnRefresh");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
