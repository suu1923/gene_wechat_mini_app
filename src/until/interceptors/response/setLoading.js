import Taro from '@tarojs/taro'
const setLoading = result => {
    console.log('response拦截器[取消Loading]', result);
    Taro.hideLoading()
    return result;
}

export default setLoading;