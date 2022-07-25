const { log } = require("../../log")

const setCatch = result => {
    log('response拦截器[捕捉异常]', result)
    
    if(result.statusCode == 400) {
        return Promise.reject(result.data.msg)
    }

    return result
}

export default setCatch