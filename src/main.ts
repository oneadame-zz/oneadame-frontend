import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

declare global {
  interface Window { grecaptcha: object }
}
window.grecaptcha = window.grecaptcha || {};

Vue.prototype.$grecaptcha = window.grecaptcha;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
