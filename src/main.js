// 入口js文件
import Vue from "vue";
import app from './App.vue'
// 关闭提示
Vue.config.productionTip = false
import router from './router'
import store from "./store";
// // 引入mockServe.js文件让它执行一次，因为没有暴露所以不需要from
import "@/mock/mockServer";
// 引入自定义过滤器
import "@/filters"
// 引入mint-ui
import { Button } from 'mint-ui';
// 注册为全局组件
Vue.component(Button.name, Button)
// 引入vue-lazyload懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入一张默认的图片
import loading from "@/common/imgs/loading.gif"
// 应用插件
Vue.use(VueLazyload, { //自定义指令
    //懒加载默认图片
    loading,
})
new Vue({
    render: h => h(app),
    // 注册路由router
    router,
    store,//注册store
}).$mount("#app")