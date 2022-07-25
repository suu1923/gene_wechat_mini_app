import request from '../../until/http';

export const usersCustomAgreement = () => {
    return request.get('/api/common/getAgreement')
}