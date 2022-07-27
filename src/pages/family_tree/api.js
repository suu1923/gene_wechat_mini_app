
import { get } from '../../until/request';
export const getFamilyData = (data) => {
    return get('/api/family/index',{...data});
}

/**
 * @desc 获取全部年份
 * @returns 
 */
export const queryAllYear = () => {
    return get('/api/family/getAllYear');
}

export const getUserListByRank = (rank) => {
    return get('/api/family/getUserListByRank',{
        rank: rank
    })
}