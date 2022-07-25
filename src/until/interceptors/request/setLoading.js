
import Taro from '@tarojs/taro'
const setLoading = options => {
    // console.log('request拦截[设置loading]',options);
    Taro.showLoading({
        title:'正在加载数据'
    })
    return options;
}

export default setLoading;