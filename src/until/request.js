import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl';
import { HTTP_STATUS } from './config';

import { log } from './log';

const handleStatusCode = (statusCode,msg) => {
    let errMsg = ''
    if (statusCode) errMsg = '数据异常!'
    switch (statusCode) {
        case 400:
            errMsg = msg
            break
        case 500:
            errMsg = msg
            break
        default:
            errMsg = '未知错误'
    }
    return errMsg
}


const customRequest = async (params, method = 'GET') => {

    let { url, data } = params;

    const BASE_URL = getBaseUrl(url);

    let contentType = "application/json";
    contentType = params.contentType || contentType;

    const requestConfig = {
        url: BASE_URL + url,
        data: data,

        method: method,
        header: {
            'content-type': contentType,
            'Token': Taro.getStorageSync('token')
        }
    };

    return await Taro.request(requestConfig).then(response => {
        if (response.statusCode != HTTP_STATUS.SUCCESS) {
            return Promise.reject(handleStatusCode(response.statusCode,response.data.msg))
        } else {
            return response.data
        }
    }).catch(error => {
        log('error', error)
        return Promise.reject(error)
    });

}

export const get = async (url, data = '') => {
    let params = { url, data }
    return await customRequest(params)
}

export const post = async (url, data, contentType) => {
    let params = { url, data, contentType }
    return await customRequest(params, 'POST')
}

export default [
    get,
    post
]
