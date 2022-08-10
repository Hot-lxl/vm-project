<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="address.name">
      <router-link slot="search" to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link
        slot="login"
        :to="userInfo._id ? '/profile' : '/login'"
        class="header_login"
      >
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-geren">{{ userInfo.name }}</i>
        </span>
      </router-link>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length > 0">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(categorys, index) in categoryArry"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="category in categorys"
              :key="category.id"
            >
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url" />
              </div>
              <span>{{ category.title }} </span>
            </a>
          </div>
        </div>
        <!-- Add Pagination 分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else />
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
import Header from "@/components/Header/Header";
import ShopList from "@/components/ShopList/ShopList";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    Header,
    ShopList,
  },
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com",
    };
  },
  mounted() {
    //获取商品列表
    this.$store.dispatch("getCategory");
    // 发送action请求获取商铺列表
    this.$store.dispatch("getShop");
  },
  computed: {
    // 获取当前地址
    ...mapGetters(["address", "categorys", "userInfo"]),

    // 计算每一页有几个商品，以及展示几页
    categoryArry() {
      // 得到所有的商品
      const { categorys } = this;
      // 创建一个空的2维数组
      const arr = [];
      // 准备一个小数组(最长度为8)
      let minArr = [];
      // 遍历所有商品
      categorys.forEach((item) => {
        // 判断minArr数组中是否有8个商品
        if (minArr.length === 8) {
          //满了就变成一个新的
          minArr = [];
        }
        // 判断minArr是空的，将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        // 把商品添加到minArr中
        minArr.push(item);
      });

      //将编译好的数据进行返回出去
      return arr;
    },
  },
  watch: {
    // 监听商品列表的改变来显示分页
    categorys: {
      immediate: true, //一上来就加载
      handler() {
        // $nextTick：在修改数据之后立即使用它，但是不会执行里面的代码，
        // 而是等待DOM的更新完成， 将回调延迟到下一次DOM更新 循环结束之后，
        this.$nextTick(function () {
          // 创建一个swiper实例对象，来实现轮播图
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 指定点可以点击跳转
              clickable: true,
            },
          });
        });
      },
    },
  },
};
</script>


<style lang="stylus" rel="stylesheet/stylus" >
@import '~@/common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>