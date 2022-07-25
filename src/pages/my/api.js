import { get, post } from '../../until/request';


/**
 * @description 获取SessionKey
 */
export const getSessionKey = (code) => {
    return get('/api/Auth_login_with_wechat/code', {
        code: code
    });
}
/**
 * @description 用户登录
 */
export const userLogin = ({ ...param }) => {
    return post('/api/auth_login_with_wechat/login', {
        ...param
    })
}

/**
 * @description 绑定手机
 */
export const bindPhone = ({ ...param }) => {
    return post('/api/Auth_login_with_wechat/getPhone', {
        ...param
    })
}

/**
 * @description 提交认证数据
 */
export const submitAuthData = (param) => {
    return post('/api/family/authSubmit', {
        ...param
    })
}

/**
 * @description 检查是否成功认证
 */
export const checkAuthRealName = () => {
    return post('/api/family/authname')
}

/**
 * @description 获取认证信息
 */
export const queryAuthInfo = () => {
    return post('/api/user/checkAuth')
}