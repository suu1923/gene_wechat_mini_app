const getBaseUrl = (url) => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    if (url.includes('/api/')) {
      BASE_URL = 'http://gene.com/index.php/'
    } else if (url.includes('/iatadatabase/')) {
      BASE_URL = 'http://gene.com/index.php/'
    }
    // else{
    // BASE_URL = 'https://gene.yuyigufen.com/'
    // }
  } else {
    // 生产环境
    if (url.includes('/api/')) {
      BASE_URL = 'https://gene.yuyigufen.com/'
    } else if (url.includes('/iatadatabase/')) {
      BASE_URL = ''
    }
  }
  return BASE_URL
}

export default getBaseUrl;