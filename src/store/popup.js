import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const popup = {
  //Khối lớp
  state: {
    isShow: false,
    FormDetail: null,
    FormName: "",
    isHideValidQuestion: true,
  },
  mutations: {
    showDialog(state, payload) {
      //Hiện form nhập liệu
      state.isShow = true;
      state.FormDetail = payload.formState; //Kiểu form
      state.FormName = payload.name;
    },
    hideForm(state) {
      state.isShow = false;
      state.FormDetail = null;
    },
    showPopUp(state) {
      state.isHideValidQuestion = false;
    },
    hidePopUp(state) {
      state.isHideValidQuestion = true;
    },
  },
  actions: {},
  getters: {},
};

export default popup;
