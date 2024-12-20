<template>
    <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
        <svg width="30" height="21" fill="currentColor">
            <use xlink:href="#icon-cart"></use>
        </svg>
        <PreloaderCart v-if="load"/> 
        <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
    </router-link> 
</template>

<script>
import PreloaderCart from './PreloaderCart.vue';//!@
import { defineComponent } from 'vue';
    export default defineComponent({
        components: {PreloaderCart},
        computed: {
            load() {
                return this.$store.state.preloaderCart;
            }
        }
    })
</script>