import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const grades = {
  //Khối lớp
  state: {
    grades: [
      {
        GradeID: 1,
        GradeName: "Khối 1",
      },
      {
        GradeID: 2,
        GradeName: "Khối 2",
      },
      {
        GradeID: 3,
        GradeName: "Khối 3",
      },
      {
        GradeID: 4,
        GradeName: "Khối 4",
      },
      {
        GradeID: 5,
        GradeName: "Khối 5",
      },
      {
        GradeID: 6,
        GradeName: "Khối 6",
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {},
};

export default grades;
