import { get,post } from '../../until/request';

/**
 * 获取banner
 */
export const getBanner = () => {
    return post('/api/banner/index');
}

/**
 * 获取导航
 */
export const getNavList = () => {
    return post('/api/nav/index')
}
/**
 * 获取名人导航
 */
 export const queryFamousNavList = () => {
    return post('/api/famous_nav/index')
}

/**
 * 获取文章
 */
export const  getArticleList = (data) => {
    return get('/api/article/index', { ...data });
}