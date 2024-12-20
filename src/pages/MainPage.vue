<template>
    <main class="content container">
        <div class="content__top content__top--catalog">
            <h1 class="content__title">
                Каталог
            </h1>
            <span class="content__info">
                152 товара
            </span>
        </div>

        <div class="content__catalog">
            <aside class="filter">
            <ProductFilter v-model:price-from="filterPriceFrom" v-model:price-to="filterPriceTo"
                v-model:category-id="filterCategotyId" v-model:colors-menu="filterColorMenu" class="filter-test"/>
            </aside>
            <section class="catalog">
                <PreloaderItem v-if="productsLoading"/>
                <ErrorLoading v-if="productsLoadingFailed"/>

                <ProductList :products="products" />

                <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" v-model:page="page" />
            </section>

        </div>
    </main>
</template>

<script>
//import products from '@/data/products'
import PreloaderItem from '@/components/PreloaderItem.vue';
import ErrorLoading from '@/components/ErrorLoading.vue';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import {API_BASE_URL} from '../config'
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { ProductList, BasePagination, ProductFilter, PreloaderItem, ErrorLoading },
    data() {
        return {
            filterPriceFrom: 0,
            filterPriceTo: 0,
            filterCategotyId: 0,
            filterColorMenu: null,
            page: 1,
            productsPerPage: 3,
            //products //products: products расширенная запись

            productsData: null,
            productsLoading: false,
            productsLoadingFailed: false,
        }
    },
    computed: {
        // filteredProducts() {
        //     let filteredProducts = products;
        //     let colorArr = [];

        //     if (this.filterColorMenu) {
        //         for (let color in products) {
        //             for (let el in products[color].color) {
        //                 if (products[color].color[el] === this.filterColorMenu) {
        //                     colorArr.push(products[color]);
        //                     filteredProducts = colorArr;
        //                 }
        //             }
        //         }
        //     }

        //     if (this.filterPriceFrom > 0) {
        //         filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
        //     };
        //     if (this.filterPriceTo > 0) {
        //         filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
        //     };
        //     if (this.filterCategotyId) {
        //         filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategotyId);
        //     }

        //     return filteredProducts;
        // },
        products() {
            return this.productsData 
            ? this.productsData.items.map(product => {
                return {
                    ...product,
                    image: product.image.file.url,
                    color: product.colors.map(product => product.code)
                }
            }) 
            : [];
            // const offset = (this.page - 1) * this.productsPerPage;
            // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
        },
        countProducts() {
            return this.productsData ? this.productsData.pagination.total : 0;
            //return this.filteredProducts.length;
        }
    },
    methods: {
        loadProducts() {
            this.productsLoading = true;
            this.productsLoadingFailed = false;
            clearTimeout(this.loadProductsTimer)
            this.loadProductsTimer = setTimeout(() => {
                axios
                    .get(API_BASE_URL + `/api/products`, {
                        params: {
                            page: this.page,
                            limit: this.productsPerPage,
                            categoryId: this.filterCategotyId,
                            colorId: this.filterColorMenu,
                            minPrice: this.filterPriceFrom,
                            maxPrice: this.filterPriceTo,
                        }
                    })
                    .then(response => this.productsData = response.data)
                    .catch(() => this.productsLoadingFailed = true)
                    .then(() => this.productsLoading = false)
                //.catch(error => console.log(error))
            }, 1000);
        }
    },
    watch: {
        page() {
            this.loadProducts();
        },
        filterPriceFrom() {
            this.loadProducts();
        },
        filterPriceTo() {
            this.loadProducts();
        }, 
        filterCategotyId() {
            this.loadProducts();
        },
        filterColorMenu() {
            this.loadProducts();
        }
    },
    created() {
        this.loadProducts();
    },
})
</script>
