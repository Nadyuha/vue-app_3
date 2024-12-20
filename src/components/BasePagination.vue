<template>
    <ul class="catalog__pagination pagination">
        <li class="pagination__item">
            <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' :page === 1}" aria-label="Предыдущая страница" @click.prevent="paginPre">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-left"></use>
                </svg>
            </a>
        </li>
        <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
            <a href="#" class="pagination__link" :class="{'pagination__link--current' :pageNumber === page}" @click.prevent="paginate(pageNumber)">
                {{ pageNumber }}
            </a>
        </li>
        <li class="pagination__item">
            <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' :page === pages}" aria-label="Следующая страница" @click.prevent="paginNext">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg>
            </a>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
    export default defineComponent({
        // model: {
        //     prop: 'page',
        //     event: 'paginate'
        // },
        props: ['modelValue', 'count', 'perPage'],
        computed: {
            page() {
                return this.modelValue;
            },
            pages() {
                return Math.ceil(this.count / this.perPage);
            }
        },
        methods: {
            paginate(page) {
                this.$emit('update:modelValue', page)
            },
            paginPre() {
                this.$emit('update:modelValue', this.page !== 1 ? this.page - 1 : this.page)
            },
            paginNext() {
                this.$emit('update:modelValue', this.page !== this.pages ? this.page + 1 : this.page)
            },
        }
    })
</script>