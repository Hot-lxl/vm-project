// 引入对应的请求接口
import { reqAddress, reqCategory, reqShops } from "@/api"
// 引入持久化插件
import VuexPersistence from 'vuex-persist';
// 创建一个对象并配置
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
})
export default {
    // 模块化编码+命名空间为true
    // namespaced: false,
    actions: {
        // 异步获取定位数据
        async getAddress({ commit, state }) {
            // 因为不能动态获取的经纬所以只能定死
            const geohash = state.latitude + "," + state.longitude
            const result = await reqAddress(geohash);
            // 成功就交给他mutations
            if (result.code == 0) {
                commit("GETADDRESS", result.data)
            }
        },
        // 异步获取食品分类列表
        async getCategory({ commit }) {
            const result = await reqCategory();
            if (result.code == 0) {
                commit("GETCATEGORY", result.data)
            }
        },
        //异步根据经纬度获取商铺列表
        async getShop({ commit, state }) {
            // 因为不能动态获取的经纬所以只能定死
            const { longitude, latitude } = state;
            const result = await reqShops(latitude, longitude);
            if (result.code == 0) {
                commit("GETSHOP", result.data)
            }
        }
    },
    mutations: {
        GETADDRESS(state, data) {
            state.Address = data;
        },
        GETCATEGORY(state, val) {
            state.Categorys = val;
        },
        GETSHOP(state, val) {
            state.Shops = val;
        }
    },

    state: {
        latitude: 40.10038, // 纬度
        longitude: 116.36867, // 经度
        Address: {},//用户位置
        Categorys: [],//商品列表
        Shops: [],//商铺列表
    },
    getters: {

        //获取用户当前位置
        address(state) {
            return state.Address || {};
        },
        //获取商品列表
        categorys(state) {
            return state.Categorys || [];
        },
        // 获取商铺列表
        shops(state) {
            return state.Shops || [];
        }

    },
    // 整个模块数据持久化
    // plugins:[vuexLocal.plugin]
}