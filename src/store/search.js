import { reqSearchShops } from "@/api"
export default {
    actions: {
        // 异步根据经纬度和关键字搜索商铺列表
        async getSearchShops({ commit, state }, keyword) {
            // 获取经纬度拼接
            const geohash = state.latitude + "," + state.longitude;
            const result = await reqSearchShops(keyword, geohash);
            if (result.code === 0) {
                commit("GETSEARCHSHOPS", result.data);
            }
        }
    },
    mutations: {
        GETSEARCHSHOPS(state, searchShops) {
            state.searchShops = searchShops;
        }
    },
    state: {
        latitude: 40.10038, // 纬度
        longitude: 116.36867, // 经度
        searchShops: [],//商铺列表
    },
    getters: {}
}