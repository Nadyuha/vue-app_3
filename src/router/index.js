//import Vue from "vue";!
import OrderPage from '@/pages/OrderPage.vue';
//import VueRouter from "vue-router";!
import MainPage from "@/pages/MainPage.vue";
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';

import { createRouter, createWebHistory } from 'vue-router';



//Vue.use(VueRouter);!

// const routes = [
//     {name: 'main', component: MainPage, path: '/'},
//     {name: 'cart', component: CartPage, path: '/cart'},
//     {name: 'product', component: ProductPage, path: '/product/:id'},
//     {name: 'notFound', component: NotFoundPage, path: '*'},
//     {name: 'order', component: OrderPage, path: '/order'},
//     {name: 'orderInfo', component: OrderInfoPage, path: '/order/:id'}
// ];


// const router = new VueRouter({
//     routes
// });

// export default router;



const routes = [
    { name: 'main', component: MainPage, path: '/' },
    { name: 'cart', component: CartPage, path: '/cart' },
    { name: 'product', component: ProductPage, path: '/product/:id' },
    { name: 'order', component: OrderPage, path: '/order' },
    { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
    //{name: 'notFound', component: NotFoundPage, path: '*'},
    { name: 'notFound', component: NotFoundPage, path: '/:pathMatch(.*)*' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
