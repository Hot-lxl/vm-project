<template>
  <!-- 评分组件 -->
  <div class="star" :class="`star-${size}`">
    <span
      class="star-item"
      v-for="(sc, index) in starClasses"
      :key="index"
      :class="sc"
    >
    </span>
  </div>
</template>

<script>
// 定义全局常量;
const CLASS_ON = "on";
const CLASS_HALF = "half";
const CLASS_OFF = "off";
export default {
  name: "Star",
  //  设计props
  props: {
    score: Number, //评分
    size: Number, //尺寸
  },
  computed: {
    // 根据评分计算出需要循环几次以及各个星的样式
    starClasses() {
      // 解构赋值获取评分
      const { score } = this;
      // 定义一个空数组
      const scs = [];
      // 1.添加n个on类名
      // 根据整数来添加的向下取整
      let scoreInteger = Math.floor(score);
      // 遍历添加on
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(CLASS_ON);
      }

      // 2.添加0个或者1个half类名
      // 评分要等于0.5才能添加
      if (score * 10 - scoreInteger * 10 >= 5) {
        scs.push(CLASS_HALF);
      }

      // 3.添加n个off类名
      //   可以添加很多个但是数量限制为5个
      while (scs.length < 5) {
        scs.push(CLASS_OFF);
      }
      // 把数组返回出去
      return scs;
    },
  },
};
</script>

<style lang="stylus" >
@import '~@/common/stylus/mixins.styl';

.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star48_on');
      }

      &.half {
        bg-image('./images/stars/star48_half');
      }

      &.off {
        bg-image('./images/stars/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star36_on');
      }

      &.half {
        bg-image('./images/stars/star36_half');
      }

      &.off {
        bg-image('./images/stars/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/stars/star24_on');
      }

      &.half {
        bg-image('./images/stars/star24_half');
      }

      &.off {
        bg-image('./images/stars/star24_off');
      }
    }
  }
}
</style>