import { get } from '../../until/request';


export const queryUserList = (params) => {
    return get('/api/family/getUserList',{...params});
}