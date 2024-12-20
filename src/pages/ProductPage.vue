<template>
    <main class="content container" v-if="productLoading">Загрузка товара...</main>
    <main class="content container" v-else-if="!productData">Не удалось загрузить товар</main>
    <main class="content container" v-else>
        <div class="container__top item__top">
            <ul class="breadcrumbs">
                <li class="breadcrumbs__item">
                    <router-link class="breadcrumbs__link" :to="{name: 'main'}">
                        Каталог
                    </router-link><!--Вариант_1-->
                </li>
                <li class="breadcrumbs__item">
                    <a class="breadcrumbs__link" @click.prevent="$router.push({name: 'main'})">
                        {{ category.title }}
                    </a><!--Вариант_2(лучше исп-ть в методе)-->
                </li>
                <li class="breadcrumbs__item">
                    <a href="" class="breadcrumbs__link">{{ product.title }}</a>
                </li>
            </ul>
        </div>
        <section class="item">
            <div class="item__pic">
                <img :src="product.image.file.url" :alt="product.title">
            </div>
            <div class="item__description">
                <div class="item__code">Артикул: {{ product.id }}</div>
                <h2 class="item__title">
                    {{ product.title }}
                </h2>
                <form class="item__form-product" action="/" method="POST" @submit.prevent="addToCart">
                <div class="item__price">
                    {{ pricePretty }} p
                </div>
                <div class="item__block">
                        <button class="item__block-btn" type="button" value="-" id="button_minus" v-on:click="countMinus">-</button>
                        <input class="item__block-input" type="number" step="1" min="1" max="10" id="num_count" value="1" v-model.number="productCount">
                        <button class="item__block-btn" type="button" value="+" id="button_plus" v-on:click="countPlus">+</button>
                </div>
                <fieldset class="form__block">
                    <legend v-if="colorsArr" class="form__legend">Цвет</legend>
                    <ul class="colors colors--black">
                        <li class="colors__item" v-for="color in colorsArr" :key="color.id" >
                            <label class="colors__label">
                                <input class="colors__radio sr-only" type="radio" :value="color" v-model="firstColor">
                                <span class="colors__value" :style="{'background-color': color}"></span>
                            </label>
                            </li>
                        </ul>
                </fieldset>
                <button type="submit" class="item__button-cart" :disabled="productAddSending">
                    В корзину
                </button>
                <!-- <button type="submit" class="item__button-cart" :disabled="productAddSending">В корзину
                    
                </button> -->
                <div v-show="productAdded">Товар добавлен в корзину</div>
                <div v-show="productAddSending">Добавляем товар в корзину...</div>
            </form>
            </div>
        </section>
    </main>
</template>

<script>
//import products from '@/data/products';
//import categories from '@/data/categories';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import {API_BASE_URL} from '../config';
import { mapActions } from 'vuex';
import { defineComponent } from 'vue';

    export default defineComponent({
        //props:['pageParams'],
        // filters: {
        //     numberFormat
        // },
        data() {
            return {
                firstColor: null,
                productCount: 1,
                productData: null,
                productLoading: false,
                productLoadingFailed: false,

                productAdded: false,
                productAddSending: false,
            }
        },
        computed: {
            pricePretty() {
                return numberFormat(this.product.price)
            },
            product() {
                //return products.find(product => product.id === this.pageParams.id)
                //return products.find(product => product.id === +this.$route.params.id)
                return this.productData;
            },
            category() {
                //return categories.find(category => category.id === this.product.categoryId)
                return this.productData.category;
            },
            colorsArr() {
                return this.productData ? this.productData.colors.map(product => product.code) : null
            },
            currentColor(){
                return this.productData ? this.colorsArr[0] : null
            },
        },
        methods: {
            ...mapActions(['addProductToCart']),
            countPlus() {
                this.productCount ? this.productCount += 1 : this.productCount
            },
            countMinus() {
                this.productCount >= 2 ? this.productCount -= 1 : this.productCount
            },
            addToCart() {
                this.productAdded = false;
                this.productAddSending = true;
                this.addProductToCart({productId: this.product.id, amount: this.productCount})
                .then(() => {
                    this.productAdded = true;
                    this.productAddSending = false;
                });
                // this.$store.dispatch(
                //     'addProductToCart',
                //     {productId: this.product.id, amount: this.productCount}
                // );
            },
            loadProduct(){
                this.productLoading = true;
                this.productLoadingFailed = false;
                axios.get(API_BASE_URL + '/api/products/' +this.$route.params.id)
                    .then(response => this.productData = response.data)
                    .catch(() => this.productLoadingFailed = true)
                    .then(() => this.productLoading = false)
                    .then(() => this.firstColor = this.currentColor)
            }
        },
        created(){
        //this.loadProduct(),
        this.firstColor = this.currentColor
        },
        watch: {
            '$route.params.id': {
                handler() {
                    this.loadProduct();
                },
                immediate: true
            }
        }
    })
</script>