import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const grades = {
  //Khối lớp
  state: {
    grades: [],
  },
  mutations: {},
  actions: {
    loadGrades({ state }) {
      axios.get("https://localhost:7291/api/v1/Grades").then((response) => {
        // commit("Set_Grades", response.data);
        state.grades = response.data;
      });
    },
  },
  getters: {},
};

export default grades;
