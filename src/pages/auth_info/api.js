import { get } from '../../until/request';


export const getContent = (id) => {
    return get('/api/family/getAuthContent', { id: id })
}