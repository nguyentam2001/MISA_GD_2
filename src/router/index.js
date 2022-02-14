import Vue from "vue";
import VueRouter from "vue-router";
import OverView from "../views/OverView.vue";
// import TheClassRoomContent from "../components/layout/over-view/TheClassRoomContent.vue";
import QuestionTypeView from "../views/QuestionTypeView.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },

  {
    path: "/demo",
    name: "Demo",
    component: () => import("../views/Demo.vue"),
  },
  {
    path: "/question-type",
    name: "QuestionTypeView",
    component: QuestionTypeView,
  },
  {
    path: "/",
    name: "OverView",
    component: OverView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
