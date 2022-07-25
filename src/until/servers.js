import { get } from "./request";

/**
 * 获取背景图
 * @returns 
 */
export const getBg = () => {
  return get('/api/common/getMainImg');
}