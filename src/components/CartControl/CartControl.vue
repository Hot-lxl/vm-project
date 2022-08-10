<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="iconfont icon-remove"
        v-if="food.count"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <div class="iconfont icon-zengjia" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  props: {
    food: Object,
  },
  methods: {
    updateFoodCount(isAdd) {
      // 不能直接操作props对象所以通过vuex来操作(传入添加的数量，以及对应的商品)
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixins.styl';

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 22px;
    color: $green;

    // 过渡生效出现和离开时间
    &.move-enter-active, &.move-leave-active {
      // transition 属性设置元素当过渡效果
      // all：全体运动时间为0.3s
      transition: all 0.3s;
    }

    // 定义进入过渡的开始状态和结束状态
    &.move-enter, &.move-leave-to {
      opacity: 0; // 透明度
      // Transform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等
      // translateX(15px)：向左平移15px
      // rotate(180deg)：旋转180度
      transform: translateX(15px) rotate(180deg);
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-zengjia {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;
  }
}
</style>