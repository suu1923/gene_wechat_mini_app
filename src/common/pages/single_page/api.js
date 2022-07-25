import { post } from '../../../until/request';

/**
 * 获取详情
 */
 export const getNavContent = (id) => {
    return post('/api/nav/getContent',{
        id:id
    })
}