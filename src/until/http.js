import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import { getInterceptor } from './interceptors'
import { log } from './log'

class httpRequest {

  // V1.0 拦截器导入错误
  // baseOptions(params, method = "GET") {
  //   let { url, data } = params;
  //   const BASE_URL = getBaseUrl(url);
  //   let contentType = "application/json";
  //   contentType = params.contentType || contentType;

  //   const option = {
  //     url: BASE_URL + url,
  //     data: data,

  //     method: method,
  //     header: {
  //       'content-type': contentType,
  //       'Token': Taro.getStorageSync('token')
  //     }
  //   };
  //   Taro.addInterceptor(this.interceptor)

  //   return Taro.request(option);
  // }

  baseOptions = (params, method = 'GET') => {

    let { url, data } = params;
    // log(params)
    const BASE_URL = getBaseUrl(url);


    let contentType = "application/json";
    contentType = params.contentType || contentType;

    const requestConfig = {
      url: BASE_URL + url,
      data: data,

      method: method,
      header: {
        'content-type': contentType,
        // 'Token': Taro.getStorageSync('token')
      },
      success: function (res) {
        log('接口返回', res)
      }
    };

    let request = Taro.request(requestConfig)
    return request
  }

  get(url, data = "") {

    let option = { url, data };

    let getRes =
      console.log('-------------GET')
    // getRes.then((res)=>{console.log(res)})
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };

    console.log('-------------POST')

    return this.baseOptions(params, "POST");
  }

  put(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url, data = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }

}

export default new httpRequest()