// 路由器模块
import Vue from "vue";
import VueRouter from "vue-router";
// 使用路由插件
Vue.use(VueRouter)

// 引入需要的组件注册路由
// import Home from '@/pages/Home/Home'
import Order from '@/pages/Order/Order'
// import Profile from '@/pages/Profile/Profile'
import Search from '@/pages/Search/Search'
import Login from "@/pages/Login/Login"
// import Shop from '@/pages/Shop/Shop'
const Shop = () => import("@/pages/Shop/Shop");
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '@/pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo'
let router = new VueRouter({
    routes: [
        // 访问/重定向到msite
        {
            path: "*",
            redirect: "/home",
        },
        // 配置路由
        {
            path: "/home",
            component: () => import("@/pages/Home/Home.vue"), //路由懒加载 当项目过大的时候可以使用
            meta: { showFooter: true }
        },
        {
            path: "/order",
            component: Order,
            meta: { showFooter: true },
        },
        {
            path: "/profile",
            component: () => import("@/pages/Profile/Profile.vue"),
            meta: { showFooter: true }
        },
        {
            path: "/search",
            component: Search,
            meta: { showFooter: true }
        },
        {
            path: "/login",
            component: Login,
            meta: { showFooter: false }

        },
        {
            path: "/shop",
            component: Shop,
            meta: { showFooter: false },
            // 配置子级路由
            children: [
                {
                    path: "goods",
                    component: ShopGoods,
                },
                {
                    path: "ratings",
                    component: ShopRatings,
                },
                {
                    path: "info",
                    component: ShopInfo,
                },
                {
                    path: "/shop",
                    redirect: "/shop/goods"
                }
            ]

        },
    ]
})


// 对外暴露
export default router;