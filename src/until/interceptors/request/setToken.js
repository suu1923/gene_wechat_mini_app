const { log } = require("../../log")

const setToken = options => {


    // log('request拦截[setToken]:', options)

    if (!options.header) {
        options.header = {};
    } else {
        options.header['token'] = 'cesces'
    }

    return options;


}

export default setToken;
