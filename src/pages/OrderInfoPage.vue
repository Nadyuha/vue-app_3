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
                    <a class="breadcrumbs__link" @click.prevent="$router.push({name: 'cart'})">
                        Корзина
                    </a>
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link">
                        Оформление заказа
                    </a>
                </li>
            </ul>

            <h1 class="content__title">
                Заказ оформлен <span>№ {{ basket.id }}</span>
            </h1>
        </div>

        <section class="cart">
            <form class="cart__form form" action="#" method="POST">
                <div class="cart__field">
                    <p class="cart__message">
                        Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
                        Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
                    </p>

                    <ul class="dictionary">
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Получатель
                            </span>
                            <span class="dictionary__value">
                                {{ basket.name }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Адрес
                            </span>
                            <span class="dictionary__value">
                                {{ basket.address }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Телефон
                            </span>
                            <span class="dictionary__value">
                                {{ basket.phone }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Email
                            </span>
                            <span class="dictionary__value">
                                {{ basket.email }}
                            </span>
                        </li>
                        <li class="dictionary__item">
                            <span class="dictionary__key">
                                Способ оплаты
                            </span>
                            <span class="dictionary__value">
                                картой при получении
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="cart__block">
                    <ul class="cart__orders">
                        <li class="cart__order" v-for="item in $store.state.orderInfo?.basket.items" :key="item.id">
                            <h3>{{ item.product.title }}</h3>
                            <b>{{ item.product.price }} ₽</b>
                            <span>Артикул: {{ item.product.id }}</span>
                        </li>
                    </ul>

                    <div class="cart__total">
                        <p>Доставка: <b>500 ₽</b></p>
                        <p>Итого: <b>{{ $store.state.orderInfo?.basket.items.length }}</b> товара на сумму <b>{{ basket.totalPrice}} ₽</b></p>
                    </div>
                </div>
            </form> 
        </section>
    </main>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        ...mapGetters({basket: 'orderDetailProducts'})
    },
    created() {
        if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
            return;
        }

        this.$store.dispatch('loadOrderInfo', this.$route.params.id)
    }
})
</script>