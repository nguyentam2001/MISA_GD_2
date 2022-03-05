import Vue from "vue";
import VueRouter from "vue-router";
import OverView from "../views/OverView.vue";
// import TheClassRoomContent from "../components/layout/over-view/TheClassRoomContent.vue";
import QuestionTypeView from "../views/QuestionTypeView.vue";
import TheQuestionTypeContent from "../components/layout/question-type/TheQuestionTypeContent.vue";
import TheQuestionResult from "../components/layout/question-type/TheQuestionResult.vue";
import ThemeTryBackground from "../views/try-views/ThemeTryBackground.vue";
import TryExercise from "../views/try-views/TryExercise.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/demo",
    name: "Demo",
    component: () => import("../views/Demo.vue"),
  },

  {
    path: "/question-type/:id",
    name: "QuestionTypeView",
    component: QuestionTypeView,
    children: [
      {
        path: "/",
        name: "question-content",
        component: TheQuestionTypeContent,
      },
      {
        path: "list",
        name: "question-list",
        component: TheQuestionResult,
      },
      {
        path: "try",
        name: "try",
        component: ThemeTryBackground,
      },
    ],
  },
  {
    path: "/theme/:id",
    name: "theme",
    component: ThemeTryBackground,
  },
  {
    path: "/try-exercies/:id",
    name: "try-exercise",
    component: TryExercise,
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
