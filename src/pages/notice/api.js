import { get } from '../../until/request';


/**
 * 获取公告列表
 */
export const getNoticeList = () => {
    return get('/api/notice/index');
}

/**
 * 获取公告详情
 */
export const getNoticeDataById = (id) => {
    return get('/api/notice/get',{
        id: id
    })
}