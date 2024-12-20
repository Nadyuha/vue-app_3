<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
        </div>
        <h3 class="product__title">
            {{ item.product.title }}
        </h3>
        <!-- <p class="product__info">
            Объем: <span>128GB</span>
        </p> -->
        <span class="product__code">
            Артикул: {{ item.product.id }}
        </span>

        <div class="product__counter form__counter">
            <button type="button" aria-label="Убрать один товар" v-on:click="countMinus">
                <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                </svg>
            </button>

            <input type="text" v-model.number="amount" name="count">

            <button type="button" aria-label="Добавить один товар" v-on:click="countPlus">
                <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                </svg>
            </button>
        </div>

        <b class="product__price">
            {{ totalPricePretty }} ₽
        </b>

        <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteCartProduct(item.productId)">
            <svg width="20" height="20" fill="currentColor">
                <use xlink:href="#icon-close"></use>
            </svg>
        </button>
    </li>

</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';
import { defineComponent } from 'vue';

    export default defineComponent({
        //filters: {numberFormat},
        props: ['item'], 
        computed: {
            totalPricePretty() {
                return numberFormat(this.item.product.price * this.item.amount)
            },
            amount: {
                get(){
                    return this.item.amount
                },
                set(value) {
                    this.$store.dispatch('updateCartProductAmount', {productId: this.item.productId, amount: value})
                }
            }
        },
        methods: {
            ...mapMutations(['deleteCartProduct']),
            deleteCartProduct(productId) {
                this.$store.dispatch('deleteCartProduct', productId)
            },
            countPlus() {
                this.amount ? this.amount += 1 : this.amount
            },
            countMinus() {
                this.amount >= 2 ? this.amount -= 1 : this.amount
            },
        },
        
    })
</script>