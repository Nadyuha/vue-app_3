
//import Vuex from 'vuex';
//import products from '@/data/products';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { createStore } from 'vuex';



export default createStore({
    state() {
        return {
            cartProducts: [],
    
            userAccessKey: null,
    
            cartProductsData: [],
    
            preloaderCart: null,
    
            orderInfo: null
        }
    }, 
    mutations: {
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo;
        },
        resetCart(state) {
            state.cartProducts = [];
            state.cartProductsData = [];
        },
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(item => item.productId === productId);

            if(item) {
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey;
        },
        updataCartProductsData(state, items) {
            state.cartProductsData = items;
        }, 
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(item => {
                return {
                    productId: item.product.id,
                    amount: item.quantity
                }
            })
        },
    },
    getters: {
        orderDetailProducts(state) {
            const basket = state.orderInfo;
                return {
                    ...basket
                }
            
        },
        cartDetailProducts(state) {
            return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p=> p.product.id === item.productId).product;

                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
                    //product: products.find(p => p.id === item.productId)
                }
            });
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
        },
        cartTotalAmound(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => item.amount + acc, 0)
        },
    },
    actions: {
        loadOrderInfo(context, orderId) {
            return axios
            .get(API_BASE_URL + '/api/orders/' + orderId, {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updateOrderInfo', response.data);
            })
        },
        loadCart(context) {
            this.state.preloaderCart = true
            return axios
            .get(API_BASE_URL + '/api/baskets', {
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                if(!context.state.userAccessKey) {
                    localStorage.setItem('userAccessKey', response.data.user.accessKey);
                    context.commit('updateUserAccessKey', response.data.user.accessKey);
                }
                context.commit('updataCartProductsData', response.data.items);
                this.state.preloaderCart = false
                context.commit('syncCartProducts');
            })

        },
        addProductToCart(context,{productId, amount}) {
            this.state.preloaderCart = true
            return (new Promise(resolve => setTimeout(resolve, 2000)))
            .then(() => {
                return axios
                .post(API_BASE_URL + '/api/baskets/products', {
                    productId: productId,
                    quantity: amount
                },{
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    context.commit('updataCartProductsData', response.data.items);
                    this.state.preloaderCart = false
                    context.commit('syncCartProducts');
                })
            })
        },
        updateCartProductAmount(context, {productId, amount}) {
            this.state.preloaderCart = true
            context.commit('updateCartProductAmount', {productId, amount});

            if(amount < 1) {
                return
            }

            return axios
            .put(API_BASE_URL + '/api/baskets/products', {
                productId: productId,
                quantity: amount
            },{
                params: {
                    userAccessKey: context.state.userAccessKey
                }
            })
            .then(response => {
                context.commit('updataCartProductsData', response.data.items);
                this.state.preloaderCart = false
            })
            .catch(() => {
                context.commit('syncCartProducts');
            })
        },
        deleteCartProduct(context, productId) {
            this.state.preloaderCart = true
            context.commit('deleteCartProduct', productId);
            return axios
            .delete(API_BASE_URL + '/api/baskets/products', {
                params: {
                    userAccessKey: context.state.userAccessKey
                },
                data: { productId }
            })
            .then(response => {
                context.commit('deleteCartProduct', response.data.items);
                this.state.preloaderCart = false
            })
            .catch(() => {
                context.commit('syncCartProducts');
            })
        }
    }
});


