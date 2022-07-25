import { post } from '../../until/request';



/**
 * @desc 提交数据
 * @returns 
 */
 export const submitAuthData = (data) =>{
    return post('/api/family/submit',{...data});
}