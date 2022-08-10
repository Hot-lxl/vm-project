// 引入发送请求api
import { reqShopInfo, reqShopRatings, reqShopGoods } from '@/api'
import Vue from 'vue';
export default {
    // 开启命名空间
    // namespaced: true,
    actions: {
        // 异步获取商家信息
        async getShopInfo({ commit }) {
            const result = await reqShopInfo();
            if (result.code == 0) {
                // 通过commit把数据传给Mutations
                commit("GETSHOPINFO", result.data);
            }
        },
        // 异步获取商品评价列表
        async getShopRatings({ commit }, callback) {
            const result = await reqShopRatings();
            if (result.code == 0) {
                commit("GETSHOPRATINGS", result.data)
                // 数据更新了，就通知组件然后调用回调函数创建BScroll
                callback && callback();
            }
        },
        // 异步获取商家商品列表
        async getShopGoods({ commit }, callback) {
            const result = await reqShopGoods();
            if (result.code == 0) {
                commit("GETSHOPGOODS", result.data);
                // 数据更新了，就通知组件然后调用回调函数创建BScroll
                callback && callback();
            }
        },
        // 更新商品的数量
        updateFoodCount({ commit }, { isAdd, food }) {
            // 判断是否为true（加+）
            if (isAdd) {//增加
                commit("INCREMENT_FOOD_COUNT", food);
            } else {//减少
                commit("DECREMENT_FOOD_COUNT", food);
            }
        },
        // 清空购物车
        clearCart({ commit }) {
            commit("CLEARCART");
        }


    },
    mutations: {
        GETSHOPINFO(state, data) {
            state.info = data;
        },
        GETSHOPRATINGS(state, data) {
            state.ratings = data;
        },
        GETSHOPGOODS(state, data) {
            state.goods = data
        },
        // 数量增加
        INCREMENT_FOOD_COUNT(state, food) {
            // 先判断是否存在food.count
            if (!food.count) {
                // 初始值为1
                //  使用Vue.set()来解决数据改变了页面不改变的问题
                Vue.set(food, "count", 1);
                // 添加到购物车
                state.ShopCart.push(food);
            } else {
                // 有则直接++数量
                food.count++;
            }

        },
        // 数量减少
        DECREMENT_FOOD_COUNT(state, food) {
            // 判断存在才能减
            if (food.count) {
                food.count--;
                // 当购物车的数量为0清空购物车
                if (food.count === 0) {
                    // 将food从cartFoods中移除
                    state.ShopCart.splice(state.ShopCart.indexOf(food), 1)
                }
            }
        },
        // 清空购物车
        CLEARCART(state) {
            // 将所有 food 的 count 置为 0
            state.ShopCart.forEach(food => food.count = 0)
            // 移除购物车的所有商品并且变为空数组
            state.ShopCart = [];
        }
    },
    state: {
        goods: [],//商品列表
        ratings: [],//商家评价列表
        info: {},//商家信息
        ShopCart: [],//购物车添加的商品列表
    },
    getters: {
        // 计算出商品分类列表
        goods(state) {
            // 避免获取到的数据为undefind
            return state.goods || [];
        },
        // 计算出添加到购物车的所有商品数量
        totalCount(state) {
            // reduce:计算出一个数组的值（累加器）0 为初始值
            return state.ShopCart.reduce((pretotal, food) => pretotal + food.count, 0)
        },
        // 计算出添加到购物车的所有商品总价
        totalPrice(state) {
            return state.ShopCart.reduce((pretotal, food) => pretotal + food.count * food.price, 0)
        }
    },
}