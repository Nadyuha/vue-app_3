<template>
    <main class="content container">
        <div class="content__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" @click.prevent="$router.push({name: 'main'})">
                        Каталог
                    </a>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Корзина
                    </a>
                </li>
            </ul>

            <h1 class="content__title">
                Корзина
            </h1>
            <span class="content__info">
                {{ totalAmound }} товара
            </span>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <ul class="cart__list">
                        <CartItem v-for="item in products" :key="item.productId" :item="item"/>
                    </ul>
                </div>

                <div class="cart__block">
                    <p v-if="totalAmound !== 0" class="cart__desc">
                        Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
                    </p>
                    <p class="cart__price">
                        Итого: <span>{{ totalPricePpretty }} ₽</span>
                    </p>

                    <router-link v-slot="{navigate}" v-if="totalAmound !== 0" :to="{name: 'order'}" custom>
                        <button class="cart__button button button--primery" type="button" :disabled="!totalPrice" @click="navigate">Оформить заказ</button>
                    </router-link>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {CartItem},
    computed: {
        ...mapGetters({products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalAmound:'cartTotalAmound'}),
        totalPricePpretty() {
            return numberFormat(this.totalPrice)
        }
    }
});
</script>