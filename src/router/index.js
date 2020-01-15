import Vue from "vue";
import VueRouter from "vue-router";
import Store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    // prevent to load content that is not available
    path: "*",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  if (to.name === "login" && Store.state.user.isauthenticated) {
    console.log("hier");
    next();
  } else if (Store.state.user.isauthenticated) {
    console.log("auth");
    next();
  } else {
    console.log("no auth");
    next({
      name: "login"
    });
  }
});

export default router;
