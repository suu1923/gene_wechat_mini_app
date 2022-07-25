import { get, post } from '../../until/request';


/**
 * @desc 获取文章列表
 * @returns 
 */
export const getArticleList = (data) =>{
    return get('/api/article/index',{...data});
}

/**
 * @desc 获取文章详情
 * @returns 
 */
export const getArticleInfo = (id) => {
    return get('/api/article/info',{id:id});
}