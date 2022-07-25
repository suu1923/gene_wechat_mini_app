import request from '../../until/http';

/**
 * 获取产品分类列表
 */
export const queryCategoryList = () => {
    return request.get('/api/product_category/index');
}