import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import CKEditor from "@ckeditor/ckeditor5-vue2";

Vue.use(CKEditor);
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
