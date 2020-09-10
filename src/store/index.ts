import Vue from 'vue';
import Vuex from 'vuex';
import Email from '@/store/modules/email';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    email: Email,
  },
});
export default store;
