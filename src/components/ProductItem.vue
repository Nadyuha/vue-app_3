<template>
    <li class="catalog__item">
        <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
          <img :src="product.image" :alt="product.title">
        </router-link>

        <h3 class="catalog__title">
          <a href="#">
            {{ product.title }}
          </a>
        </h3>

        <span class="catalog__price">
          {{ pricePretty }} p
        </span>

        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in product.color" :key="color.id" >
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" :value="color" v-model="colorFirst">
              <span class="colors__value" :style="{'background-color': color}"></span>
            </label>
          </li>
        </ul>
      </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
      return {
        colorFirst: null
      };
    },
    props: ['product', 'modelValue'],
    computed: {
      color() {
        return this.product.color ? this.product.color[0] : null
      },
      pricePretty() {
        return numberFormat(this.product.price)
      },
    },
    created(){
        this.colorFirst = this.color
    },
})
</script>