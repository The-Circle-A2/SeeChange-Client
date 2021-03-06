import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Dashboard from "../pages/dashboard/dashboard.vue";
import Profile from "../pages/profile/profile.vue";
import Stream from "../pages/stream/stream.vue";
import Connect from "../pages/authenticate/connect.vue";
import NotFound from "../pages/404.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/stream/:id",
      name: "stream",
      component: Stream,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: Profile,
    },
    {
      path: "/connect",
      name: "connect",
      component: Connect,
      meta: {
        layout: "authenticate",
        requiresVisitor: true,
      },
    },
    {
      // Error 404 page
      path: "*",
      name: "404",
      component: NotFound,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters['authenticate/isAuthenticated'];

//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (isAuthenticated) {
//       next();
//       return;
//     }
//     next({name: 'login'});
//   }
//   else if (to.matched.some(record => record.meta.requiresVisitor)) {
//     if (isAuthenticated) {
//       next({name: 'dashboard'});
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// })

export default router;
