<template>
  <div>
    <div class="goods">
      <!-- 商品分类 -->
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            :class="{ current: currentIndex == index }"
            v-for="(goods, index) in goods"
            :key="index"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="goods.icon" v-if="goods.icon" />
              {{ goods.name }}
            </span>
          </li>
        </ul>
      </div>
      <!-- 商品列表 -->
      <div class="foods-wrapper">
        <ul>
          <li
            class="food-list-hook"
            v-for="(goods, index) in goods"
            :key="index"
          >
            <!-- 商品标题 -->
            <h1 class="title">{{ goods.name }}</h1>
            <ul>
              <!-- 商品 -->
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in goods.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.info }}</p>
                  <div class="extra">
                    <span class="count">月售 {{ food.sellCount }} 份</span>
                    <span>好评率 {{ food.rating }} %</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }} </span>
                    <span class="old" v-if="food.oldPrice">
                      ￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <FoodDetails :food="food" ref="food" />
  </div>
</template>

<script>
import ShopCart from "@/components/ShopCart/ShopCart.vue";
import FoodDetails from "@/components/FoodDetails/FoodDetails.vue";
import CartControl from "@/components/CartControl/CartControl.vue";
import BScroll from "@better-scroll/core";
import { mapState, mapGetters } from "vuex";
export default {
  name: "ShopGoods",
  components: {
    CartControl,
    FoodDetails,
    ShopCart,
  },
  data() {
    return {
      scrollY: 0, //右侧Y轴滑动的坐标
      tops: [], //右侧所有分类小列表的top值
      food: {}, //定义一个传入详情页面的空对象
    };
  },

  mounted() {
    //页面加载完成发送ajax获取数据
    this.$store.dispatch("getShopGoods", () => {
      // goods 更新了, 界面还没有更新
      //将回调延迟到下次DOM更新，循环结束之后
      this.$nextTick(() => {
        // 商品滚动
        this._initScroll();
        // 商品分类小列表top值
        this._initTops();
      });
    });
  },
  computed: {
    // 获取商品信息
    ...mapGetters(["goods"]),
    
    //计算属性得到当前分类的下标
    currentIndex() {
      // 得到条件数据
      const { scrollY, tops } = this;
      // 通过findIndex计算出符合条件的下标
      let index = tops.findIndex((item, index) => {
        // 滚动的数必须大于或等于第一个数并且小于第二个数 得到大于第一个数的下标
        return scrollY >= item && scrollY < tops[index + 1];
      });
      // 返回结果
      return index;
    },
  },
  methods: {
    // 初始化滚动条
    _initScroll() {
      // 页面加载完成创建BScroll
      // 使用better-scroll ui库让商品分类滚动
      new BScroll(".menu-wrapper", {
        // 允许使用原生点击事件
        click: true,
      });
      // 商品列表滚动
      this.foodsScroll = new BScroll(".foods-wrapper", {
        // 派发srcoll事件
        // 手指滑动(惯性滑动和编码滑动不监视)
        probeType: 2,
        // 允许使用原生点击事件
        click: true,
      });
      // 给右侧绑定scroll监听事件
      this.foodsScroll.on("scroll", ({ x, y }) => {
        // 保存y赋值给scroll
        // Math.abs:绝对值
        this.scrollY = Math.abs(y);
      });
      // 给右侧绑定scrollEnd结束事件(解决惯性滑动不触发的bug)
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        console.log("scrollEnd", y);
        // 把最后结束的位置赋值给scroll
        this.scrollY = Math.abs(y);
      });
    },
    // 初始化tops获取每个li的高度
    _initTops() {
      //1. 定义一个tops数组
      const tops = [];
      // 初始化一个数字为数组内容
      let top = 0;
      // 添加到tops
      tops.push(top);
      // 2.获取所有ul下的li
      const list = document.getElementsByClassName("food-list-hook");
      //  转成真正的数组
      Array.prototype.slice.call(list).forEach((item) => {
        // 获取li高度
        top += item.clientHeight;
        // 添加到tops
        tops.push(top);
      });
      // 把tops保存在定义的tops中
      this.tops = tops;
    },
    // 点击分类下标变换颜色，并且右侧商品列表滚动到对应的位置
    clickMenuItem(index) {
      // 得到操作的数据
      // 得到index则修改tops的位置
      const top = this.tops[index];
      // 更新目标 scrollY 值
      this.scrollY = top;
      // 平滑滑动右侧列表
      this.foodsScroll.scrollTo(0, -this.scrollY, 300);
    },
    // 点击显示FoodDetails组件以及把food传入组件
    showFood(food) {
      // 改变food值传入给foodDetails值
      this.food = food;
      // 得到子组件并且调用子组件的方法
      this.$refs.food.toggleShow();
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>