import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

import '@/assets/css/global.css';

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme



import axios from 'axios';

axios.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.getItem('token');
    return config;
})

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.component('treeTable', TreeTable)
Vue.use(VueQuillEditor)
Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(originVal);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1 + '').padStart(2, '0');
    const date = (dt.getDate() + '').padStart(2, '0');
    const hour = (dt.getHours() + '').padStart(2, '0');
    const min = (dt.getMinutes() + '').padStart(2, '0');
    const sec = (dt.getSeconds() + '').padStart(2, '0');
    return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')