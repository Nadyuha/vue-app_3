<template>
    <ul class="catalog__list">
        <ProductItem v-for="product in products" :key="product.id" :product="product"></ProductItem>
    </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components: {ProductItem},
    props: ['products']
}) 
</script>