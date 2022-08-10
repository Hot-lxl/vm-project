/* 
自定义过滤器模块
*/
// 引入moment：时间处理解析数字
// import moment from "moment";
//引入轻量级时间库
// import format from 'date-fns/format'
// 更为轻量级
import dayjs from "dayjs";
import Vue from "vue";
// 注册为全局过滤
Vue.filter("dateString", function (value, formatString) {
    // format为undefind则输出自定的时间格式
    // return moment(value).format("YYYY-MM-DD HH时-mm分-ss秒");
    // return format(value, "yyyy-MM-dd HH时-mm分-ss秒");
    return dayjs(value).format("YYYY-MM-DD HH时-mm分-ss秒");
})