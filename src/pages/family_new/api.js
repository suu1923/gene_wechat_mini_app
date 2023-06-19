
import { get, post } from '../../until/request';
/**
 * @desc 获取族谱数据
 * @param {*} data 
 * @returns 
 */
export const getFamilyData = (data) => {
    return post('/api/family/index', { ...data });
}

/**
 * @desc 获取族谱分组数据
 * @param {*} data 
 * @returns 
 */
export const getFamilyGroupData = (data) => {
    return post('/api/family_group/index', { ...data });
}


/**
 * @desc 获取全部年份
 * @returns 
 */
export const queryAllYear = () => {
    return get('/api/family/getAllYear');
}

export const getUserListByRank = (rank) => {
    return get('/api/family/getUserListByRank', {
        rank: rank
    })
}