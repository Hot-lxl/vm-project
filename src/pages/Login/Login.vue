<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="changeLoginWay(false)"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="changeLoginWay(true)"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{ on: !loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_hone: rightPhone }"
                @click.prevent="getCode"
              >
                {{
                  computeTime == 0 ? "获取验证码" : `重新获取(${computeTime}s)`
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-if="showPwd"
                  v-model="pwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-else
                  v-model="pwd"
                />

                <div
                  class="switch_button"
                  @click="showPwd = !showPwd"
                  :class="showPwd ? 'on' : 'off'"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text"
                    >{{ showPwd ? "abc" : "..." }}
                  </span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click="getCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </section>
</template>

<script>
import AlertTip from "@/components/AlertTip/AlertTip";
// 因为界面要得到响应结果所以写在组件发送请求
import { reqCaptca, reqUserLogin, reqCode, reqPhoneLoging } from "@/api";
export default {
  name: "Login",
  components: {
    AlertTip,
  },
  data() {
    return {
      loginWay: true, //true 代表密码登陆, false 代表短信登陆
      computeTime: 0, //倒计时时间
      showPwd: false, //密码显示与隐藏
      phone: "", //手机号
      code: "", //短信验证码
      name: "", //用户名
      pwd: "", //接收用户输入的密码
      captcha: "", //图形验证码,
      alertShow: false, //控制提示框是否显示
      alertText: "", //提示文本框
    };
  },

  // mounted() {

  // },
  computed: {
    // 验证手机号是否符合要求
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },

  methods: {
    // 封装一个方法来获错误提示语
    getAlert(val) {
      this.alertShow = true;
      this.alertText = val;
    },

    // 点击获取验证码计时效果
    async getCode() {
      // 判断是否有定时器
      if (this.computeTime == 0) {
        //没有
        // 定义初始值为30s
        this.computeTime = 30;
        // 启动定时器
        this.interval = setInterval(() => {
          // 每次减1
          this.computeTime--;
          // 判断为0不能减了
          if (this.computeTime <= 0) {
            // 清除定时器
            clearInterval(this.interval);
          }
        }, 1000);
        // 发送actions请求获取手机号验证码
        const result = await reqCode(this.phone);
        // 判断是否成功
        if (result.code === 1) {
          // 显示提示
          this.getAlert(result.msg);
          // 停止计时
          if (this.computeTime) {
            // 时间重置为0
            this.computeTime = 0;
            // 关闭定时器
            clearInterval(this.interval);
            // 节约性能定时器改为undefild
            this.interval = undefined;
          }
        } else {
          code = result.data;
        }
      }
    },

    //登录验证或者注册
    async login() {
      // 定义一个变量来接收结果
      let result;

      // 判断是什么登录
      // 短信登录（注册）
      if (!this.loginWay) {
        // 得到想要的数据
        const { rightPhone, phone, code } = this;
        if (!rightPhone) {
          this.getAlert("手机号输入不正确");
          return;
        } else if (!/^\d{6}$/.test(code)) {
          //验证码
          this.getAlert("验证必须是6位数字");
          return;
        }
        // 发送ajax请求短信登陆
        result = await reqPhoneLoging(phone, code);
      } else {
        // 密码登录
        // 判断用户名密码验证码不为空
        if (!this.name) {
          // 用户名必须指定
          this.getAlert("用户名必须指定");
          return;
        } else if (!this.pwd) {
          // 密码必须指定
          this.getAlert("密码必须指定");
          return;
        } else if (!this.captcha) {
          // 验证码必须指定
          this.getAlert("验证码必须指定");
          return;
        }
        // 发送ajax请求密码登录
        result = await reqUserLogin(this.name, this.pwd, this.captcha);
      }

      // 判断成功
      if (result.code === 0) {
        // 成功之后把用户的信息保存起来vuex
        this.$store.dispatch("saveUser", result.data);
        // 成功之后路由跳转
        this.$router.push("/profile");
      } else {
        // 判断为密码登录才刷新图形码
       if(this.loginWay){
         // 刷新图形验证码
        this.getCaptcha();
       }
        // 错误提示
        this.getAlert(result.msg);
      }
    },
    //切换登录方式
    changeLoginWay(val) {
      if (val) {
        //密码登录
        // 状态变为密码登录
        this.loginWay = true;
        // 清空手机号
        this.phone = "";
        // 清空验证码
        this.code = "";
      } else {
        // 状态变为密码登录
        this.loginWay = false;

        // 清空账号密码和图形码
        this.name = "";
        this.pwd = "";
        this.captcha = "";
      }
    },
    // 点击变化图形码
    getCaptcha() {
      // 加上当前时间就可以实现每次都不一样了
      this.$refs.captcha.src = "http://localhost:4000/captcha?itme="+Date.now();
    },
    // 触发自定义事件关闭窗口
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
  },
};
</script>

<style lang="stylus">
@import '~@/common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }

            .right_hone {
              color: black;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>