// http/index.js
import axios from 'axios'
//创建axios的一个实例 
var instance = axios.create({
    baseURL: 'http://jhc.owvlab.net/openapi/', //接口统一域名
    timeout: 6000, //设置超时
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;',
    }
})

//请求拦截器 
instance.interceptors.request.use((config) => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        const token = window.localStorage.getItem('token');
        token && (config.headers.Authorization = token)
        //若请求方式为post，则将data参数转为JSON字符串
        if (config.method === 'POST') {
            config.data = JSON.stringify(config.data);
        }
        return config;
    }, (error) =>
    // 对请求错误做些什么
    Promise.reject(error));

//响应拦截器
instance.interceptors.response.use((response) => {
    //响应成功
    console.log('拦截器报错');
    return response.data;
}, (error) => {
    console.log(error)
    //响应错误
    return Promise.reject(error);
});


export default instance;