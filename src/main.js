import Vue from 'vue';
import iviewui from 'view-design';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(iviewui);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
