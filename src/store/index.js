// vuex最核心的管理对象store
import Vuex from 'vuex'
import Vue from 'vue'
import home from './home';
import order from './order';
import profile from './profile';
import search from './search';
import user from './user';
import shop from './shop';

//在vuex初始化时导入插件
// import persist from 'vuex-persistedstate'
// 应用插件
Vue.use(Vuex);
// 向外暴露vuex实例就可以得到对应的模块
export default new Vuex.Store({
    modules: {//模块化vuex
        home,
        order,
        profile,
        search,
        user,
        shop
    },
    // plugins: [new persist({
    //     storage: window.localStorage,//默认这种存储方式
    // })]
})