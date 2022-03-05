import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const paging = {
  //Khối lớp
  state: {
    pageSizes: [
      {
        Pagelabel: "6 học liệu trên trang",
        Pagevalue: 6,
      },
      {
        Pagelabel: "12 học liệu trên trang",
        Pagevalue: 12,
      },
      {
        Pagelabel: "18 học liệu trên trang",
        Pagevalue: 18,
      },
      {
        Pagelabel: "24 học liệu trên trang",
        Pagevalue: 24,
      },
    ],
    //PageSize
    PageSize: 6,
    PageIndex: 1,
    TotalPage: null,
    TotalRecord: null,
  },
  mutations: {},
  actions: {
    //set pageindex chuyển trang
    setPageIndex({ state, dispatch }, currIndex) {
      state.PageIndex = currIndex;
      dispatch("loadExercises");
    },
  },
  getters: {},
};

export default paging;
