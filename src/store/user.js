import { reqGetUserInfo, reqLoginOut } from "@/api"
export default {
    actions: {
        // 记录用户信息
        saveUser({ commit }, user) {
            commit("GETUSERINFO", user)
        },

        // 异步获取用户信息
        async getUserInfo({ commit }) {
            const result = await reqGetUserInfo();
            // 获取成功
            if (result.code == 0) {
                commit("GETUSERINFO", result.data);
            }
        },
        // 异步退出登录
        async logout({ commit }) {
            const result = await reqLoginOut();
            // 成功那么就交个mutations然后修改state
            if (result.code) {
                commit("LOGOUT");
            }
        }

    },
    mutations: {
        GETUSERINFO(state, val) {
            state.userInfo = val;
        },
        LOGOUT(state) {
            // 清空用户信息
            state.userInfo = {};
        }
    },
    state: {
        userInfo: {},//用户登录信息
    },
    getters: {
        // 获取出用户信息
        userInfo(state) {
            return state.userInfo || {};
        }
    }
}