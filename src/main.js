import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/api/lib/fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴
import "@/api/lib/vueBootstrap.js";

Vue.config.productionTip = false;

// Vue Router 인스턴스에 beforeEach 가드를 추가합니다.
router.beforeEach((to, from, next) => {
  if (from.name && !to.name) {
    // 라우터를 벗어나는 경우, Vuex(store)를 초기화하는 메소드를 호출합니다.
    store.dispatch('resetStore');
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
