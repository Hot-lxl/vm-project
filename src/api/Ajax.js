// ajax 请求函数模块
import axios from "axios";
// 1.利用axios对象的create，创建一个axios实例
// 2.requests就是axios实例对象，给它配置一下其他的方法
const requests = axios.create({
    // 配置
    // 基础路径没有相同的就不写
    // baseURL: "",
    // 设置超时时间
    timeout: 5000,

});
// 设置请求拦截器：在发送请求之前可以检测到，可以在发送之前做一些事情
requests.interceptors.request.use(config => {

    // config:配置对象，对象里面有一个属性很重要，headers请求头
    return config;
})

// 设置响应拦截器：在服务器响应数据之后，可以对响应结果做一些处理
requests.interceptors.response.use(res => {

    // 成功的回调：服务器响应数据回来之后，响应拦截器可以检测到
    return res.data;
}, (error) => {
    // 失败回调：终止promis链并给出提示
    return Promise.reject(error);
})

// 重新暴露axios实例
export default requests;