import Taro from "@tarojs/taro";
import getBaseUrl from "./baseUrl";
import { log } from "./log";
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/login"
    });
  }
}

/**
 * @desc 将一个数组按照指定长度分为N个数组
 * @param {数组} arr 
 * @param {长度} size 
 * @returns 
 */
export const chunk = (arr, size) => {
  let arr2 = [];
  for (var i = 0; i < arr.length; i = i + size) {
    arr2.push(arr.slice(i, i + size));
  }
  return arr2;
}

/**
 * 数字转中文
 * @param 数字 num 
 * @returns 
 */
export const toChinesNum = (num) => {
  
  let changeNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = ['', '拾', '佰', '千', '萬']
  num = parseInt(num)
  let getWan = (temp) => {
    let strArr = temp.toString().split('').reverse()
    let newNum = ''
    let newArr = []
    strArr.forEach((item, index) => {
      newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
    })
    let numArr = []
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n)
    })
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m
          }
        } else {
          newNum += m
        }
      })
    } else {
      newNum = newArr[0]
    }

    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

// 页面跳转
export const toPage = (url) => {
  Taro.navigateTo({
    url: url
  })
}

// 格式化富文本
export const formatContent = (content) => {

  return content ? content.replace(
    /\<img/gi,
    '<img style="display:block; width:98%; margin:0 auto" '
  ) : '';
}

// 消息提示
export const iShowToast = (text, icon, time, mask) => {
  Taro.showToast({
    title: text,
    icon: icon,
    time: time ? time : 3000,
    mask: mask ? mask : false
  })

}

export const startLoading = () => {
  Taro.showLoading({
    title: '正在加载数据',
    mask: true
  })
}

export const stopLoading = () => {
  Taro.hideLoading();
}

import { getBg } from "./servers";
/**
 * 上传文件
 */
export const uploadFile = (tempFilePaths) => {
  console.log(getBaseUrl('/api/')+'/api/common/upload');

  return Taro.uploadFile({
    url: getBaseUrl('/api/')+'/api/common/upload',
    // url: getBaseUrl('') + '/api/common/upload',
    filePath: tempFilePaths,
    name: 'file',
    header: {
      'content-type': 'multipart/form-data',
      'cookie': 'token=' + Taro.getStorageSync('token')
    },
    success(res) {
      return res.data;
    }
  })
}

/**
 * 返回上两页
 */
export const pageBack = () => {
  Taro.navigateBack({
    delta: 2
  })
}

/**
 * 设置全局背景
 */
export const globalBg = () => {
  if (Taro.getStorageSync('bg_url') == '' || Taro.getStorageSync('bg_url') == null) {
    getBg().then(res => {
      log('背景图',res)
      Taro.setStorageSync('bg_url', res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}

/**
 * @desc 获取存储值
 * @param {*} key 
 * @returns 
 */
export const getStorageValue = (key) => {
  try {
    var value = Taro.getStorageSync(key);
    if (value) return value;
    else return '';
  } catch (e) {
    return '';
  }
}

export const setPageTitle = (name) => {
  try {
    Taro.setNavigationBarTitle({
      title: name
    })
  } catch (e) {
    console.log('设置页面标题错误')
  }
}