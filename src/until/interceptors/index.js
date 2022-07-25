import Taro from "@tarojs/taro"
import { log } from '../log';
import request from './request/index';
import response from './response/index'
import responseInterceptor from '../interceptors';

export const interceptor = {
    request,
    response
};

/**
 * 拦截器
 * @param {*} chain 
 * @returns 
 */
export const getInterceptor = (chain = {}) => {

    // 依次设置请求拦截器
    let requestParams = chain.requestParams;

    // for (const key in request) {
    //     requestParams = request[key](requestParams);
    // }

    // log('请求拦截器', requestParams)
    //  responseObject = {};
    // log('响应拦截器初始化响应', responseObject)

    // log('默认拦截器',chain.proceed(requestParams))
    // 依次设置响应拦截器
    // for (const key in response) {

    //     log('key',key)
    //     responseObject = chain.proceed(requestParams).then(
    //         res => {
    //             return response[key](res)
    //         }
    //     )
    //     log('响应拦截器初始化响应2', responseObject)

    // }
    let responseObject = chain.proceed(requestParams).then((res) => {
        // log('这一个拦截器的返回',res)
        return response[1](res)
    })

    log('我在拦截器里面')

    // log('只有一个拦截器了', responseObject)

    return responseObject;



    return chain.proceed(requestParams).then(res => {
        // 隐藏加载状态
        Taro.hideLoading();
        log('进来了')
        // 对响应数据做拦截处理，包括权限验证，错误异常处理等
        if (res.statusCode === 400) {
            return Promise.reject('草')
        }
        return res
        // return responseInterceptor(res);
    })

};
