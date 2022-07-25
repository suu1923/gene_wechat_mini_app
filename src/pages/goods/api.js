import { post } from '../../until/request';


/**
 * 获取产品列表
 */
export const getProductList = (data) => {
    return post('/api/product/index',{...data})
}
/**
 * 支付
 */
export const pay = (data) => {
    return post('/api/pay/test', { ...data });
}
