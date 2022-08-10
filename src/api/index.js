/* 
    包含n个接口请求函数的模块（与后台交互模块）
    函数的返回值为：promise对象
*/
// 引入ajax的发送请求
import requests from "./Ajax";
// 引入mock模拟数据请求
import MockAjax from './MockAjax'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => requests({ url: `/api/position/${geohash}`, method: "get" })
// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategory = () => requests({ url: "/api/index_category", method: "get" })
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (latitude, longitude) => requests({ url: `/api/shops?latitude=${latitude}&longitude=${longitude}` })
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShops = (keyword, geohash) => requests({ url: `/api/search_shops?keyword=${keyword}&geohash=${geohash}`, method: "get" })
// [5、获取一次性验证码](#5获取一次性验证码)<br/>
export const reqCaptca = () => requests({ url: "/api/captcha", method: "get" })
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqUserLogin = (name, pwd, captcha) => requests({ url: "/api/login_pwd", data: { name, pwd, captcha }, method: "post" })
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqCode = (phone) => requests({ url: `/api/sendcode?phone=${phone}`, method: "get" })
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqPhoneLoging = (phone, code) => requests({ url: "/api/login_sms", data: { phone, code }, method: "post" })
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqGetUserInfo = () => requests({ url: "/api/userinfo", method: "get" })
// [10、用户登出](#10用户登出)<br/>
export const reqLoginOut = () => requests({ url: "/api/logout", method: "get" })

// 获取商家信息
export const reqShopInfo = () => MockAjax({ url: "/info" ,method:"get"})
// 获取商家评价数组
export const reqShopRatings = () => requests({ url: "/ratings", method: "get" })
// 获取商家商品数组
export const reqShopGoods = () => MockAjax({ url: "/goods", method: "get" })
