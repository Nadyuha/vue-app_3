// import Vue from 'vue';
// import App from './App.vue';
// import router from './router';
// import store from './store';


// Vue.config.productionTip = false

// new Vue({
//   router: router,
//   store: store,
//   render: h => h(App),
// }).$mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
