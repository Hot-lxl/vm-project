<template>
  <div id="app">
    <!-- 路由组件出口地方 -->
    <router-view></router-view>
    <!-- <Header></Header> -->
    <!-- 底部 -->
    <!-- $route.meta.showFooter:在某个组件隐藏或者显示 -->
    <FooterGuide v-if="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from "@/components/FooterGuide/FooterGide";
import Header from "@/components/Header/Header.vue";

import { reqCategory } from "@/api";
export default {
  // 根组件（应用组件）
  name: "App",
  components: {
    FooterGuide,
    Header,
  },
  // 创建页面之前
  created() {
    // 页面加载发送ajax请求获取定位信息
    this.$store.dispatch("getAddress");
    // 异步获取用户登录信息
    this.$store.dispatch("getUserInfo")
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scope >
@import '~@/common/stylus/mixins.styl';

#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>