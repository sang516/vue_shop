import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'

import '@/assets/css/global.css';

import axios from 'axios';

axios.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.getItem('token');
    return config;
})

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.component('treeTable', TreeTable)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')