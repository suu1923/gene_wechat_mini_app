import { log } from "../../log";

const setResult = result => {

    log('response拦截器[设置返回格式]', result);

    // 返回Permise的data对象
    log('当前状态:',result.data)
    return result.data
}

export default setResult