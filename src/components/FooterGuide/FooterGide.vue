<template>
  <div class="footer_guide">
    <div
      class="guide_item"
      @click="goto('/home')"
      :class="{ on: isCurrent('/home') }"
    >
      <span class="item_icon">
        <i class="iconfont icon-underline"></i><br />
      </span>
      <span>首页</span>
    </div>
    <div
      class="guide_item"
      @click="goto('/search')"
      :class="{ on: isCurrent('/search') }"
    >
      <span class="item_icon">
        <i class="iconfont icon-icon-search"></i><br />
      </span>
      <span>搜索</span>
    </div>
    <div
      class="guide_item"
      @click="goto('/order')"
      :class="{ on: isCurrent('/order') }"
    >
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i><br />
      </span>
      <span>订单</span>
    </div>
    <div
      class="guide_item"
      @click="goto('/profile')"
      :class="{ on: isCurrent('/profile') }"
    >
      <span class="item_icon">
        <i class="iconfont icon-geren1"></i><br />
      </span>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterGuide",
  methods: {
    // 点击路由跳转（编程式导航）
    goto(path) {
      this.$router.push(path);
    },
    // 判断点击的路由变颜色
    isCurrent(paths) {
      // console.log(this.$route.path);
      return this.$route.path === paths;
    },
  },
};
</script>

<style lang="less"  rel="stylesheet/stylus">
// footer
.footer_guide {
  // 意思是盒子弹性布局
  display: flex;
  width: 100%;
  height: 50px;
  // border-top-10px(#e4e4e4);
  // 固定定位
  position: fixed;
  // z-index 属性指定一个元素的堆叠顺序。值越大越前面
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  .guide_item {
    display: flex;
    // 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
    flex: 1;
    text-align: center;
    // flex-direction 属性规定灵活项目的方向。灵活的项目将垂直显示，正如一个列一样
    flex-direction: column;
    // align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式
    align-items: center;
    margin: 5px;
    color: #999999;
    &.on {
      color: #02a774;
    }
    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;
    }

    .iconfont {
      font-size: 22px;
    }
  }
}
</style>