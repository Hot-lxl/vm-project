// 引入mockjs模块
import Mock from 'mockjs'
// 引入模拟的json数据
import apiDate from "./data.json"
// 使用mock方法：第一个参数请求地址，第二个参数：对象成功返回和请求数据
// 商品goods
Mock.mock("/goods", { code: 0, data: apiDate.goods })
// 商家评分ratings
Mock.mock("/ratings", { code: 0, data: apiDate.ratings });
// 商家信息info
Mock.mock("/info", { code: 0, data: apiDate.info })