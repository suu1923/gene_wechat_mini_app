import { get } from '../../until/request';

/**
 * 根据人物ID获取
 */
 export const queryUserInfo = (id) => {
    return get('/api/family/getUserInfoById',{
        id: id
    });
}