import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtButton, AtModal, AtModalHeader, AtModalContent } from "taro-ui"
import "taro-ui/dist/style/components/flex.scss";
import './index.scss'
import "taro-ui/dist/style/components/action-sheet.scss";

import unLoginPng from '../../resource/my_un_login.png'
import "taro-ui/dist/style/components/modal.scss";

import "taro-ui/dist/style/components/checkbox.scss";
import "taro-ui/dist/style/components/icon.scss";

import myInfoPng from '../../resource/my_info.png'
import myAuthPng from '../../resource/my_auth.png'
import myMessagePng from '../../resource/my_message.png'
import myCustomerPng from '../../resource/my_customer.png'
import Taro from '@tarojs/taro';
import { bindPhone, getSessionKey, queryAuthInfo, userLogin } from './api';
import { getStorageValue, iShowToast, toPage } from '../../until/util';
import "animate.css"
export default class Index extends Component {

  constructor(props) {

    super(props)
    this.state = {
      bindPhoneShow: false,
      token: Taro.getStorageSync('token'),
      user: Taro.getStorageSync('user'),
      authorize: Taro.getStorageSync('authorize'),

      readAgreement: true,
      agreementContent: '',
      showAgreementBox: false,


      navData: [
        {
          name: '个人档案信息',
          img: myInfoPng,
          url: '/pages/my/auth_info/index',
        },
        {
          name: '名人认证',
          img: myAuthPng,
          url: '/pages/auth/main/index',
        },
        {
          name: '商品管理',
          img: myAuthPng,
          url: '/pages/goods/index'
        },
        {
          name: '我的消息',
          img: myMessagePng,
          url: '/pages/notification/index',
        },
        {
          name: '联系客服',
          img: myCustomerPng,
          url: '',
        }
      ],
      login: false,
      userInfo: {
        userName: '未登录'
      }
    }

    this.checkboxOption = [{
      value: 'list1',
      label: '绑定手机号代表同意《用户协议》',
    }]

  }
  handleChange(value) {
    this.setState({
      checkedList: value
    })
  }
  getToken() {
    let that = this;
    Taro.getUserProfile({
      desc: "用于完善用户资料",
      success: user_profile_res => {
        Taro.login().then(login_res => {
          getSessionKey(login_res.code).then(session_key_res => {
            if (session_key_res.code == 1) {
              let login_params = {
                'encryptedData': user_profile_res.encryptedData,
                'iv': user_profile_res.iv,
                'sessionKey': session_key_res.data.session_key,
                'openid': session_key_res.data.openid
              }
              userLogin(login_params).then(login_res => {
                if (login_res.code == 1) {
                  Taro.setStorageSync('user', login_res.data)
                  Taro.setStorageSync('sessionKey', session_key_res.data.session_key)
                  Taro.setStorageSync('token', login_res.data.token)
                  Taro.setStorageSync('authorize', true)
                  // 判断手机号
                  if (!login_res.data.mobile) {
                    // 弹出来绑定手机号的页面
                    this.setState({
                      bindPhoneShow: true
                    })
                  }

                  that.setState({
                    token: login_res.data.token,
                    user: login_res.data,
                    authorize: true
                  })
                  iShowToast('登录成功!', 'error')
                } else {
                  iShowToast('登录失败，请重试!', 'error')
                }
              }).catch(err => {
                iShowToast(err.msg, 'error')
              })
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },
      fail: err => {
        Taro.showToast({
          title: '获取失败',
          icon: 'error'
        })
      }
    })

  }

  componentWillMount() {
    // 读取到缓存，login
    // 调取接口首页
    // iShowToast('获取失败', 'error')
    this.checkPhone()
  }

  checkPhone() {
    const userInfo = Taro.getStorageSync('user')

    if (userInfo && (userInfo.mobile == null || userInfo.mobile == '')) {
      this.setState({
        bindPhoneShow: true
      })
    }
  }

  // 授权登录
  authLogin = () => {
    if (this.state.authorize == false) {
      this.getToken()
    }
  }

  getPhoneNumber = (res) => {

    let _data = {
      encryptedData: res.detail.encryptedData,
      iv: res.detail.iv,
      sessionKey: Taro.getStorageSync('sessionKey')
    }

    bindPhone(_data).then(res => {
      // 更新Storage
      let storeageData = Taro.getStorageSync('user');
      storeageData.mobile = res.data

      Taro.setStorageSync('user', storeageData)
      this.setState({
        active_show: false
      })
      iShowToast('绑定成功！', 'success')
    }).catch(err => {
      console.log(err)
      iShowToast('授权失败', 'error')
    })

    this.setState({
      bindPhoneShow: false
    })

  }

  showAgreement() {
    usersCustomAgreement().then(res => {
      this.setState({
        agreementContent: res.data,
        showAgreementBox: true
      })

    }).catch(err => {
      iShowToast('获取失败', 'error')
    })
  }

  render() {
    const { navData, user, readAgreement, agreementContent, showAgreementBox } = this.state;
    const bg_url = getStorageValue('bg_url')
    return (
      <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
        <View className='header' onClick={this.authLogin.bind(this)}>
          <View className='avatar'>
            <Image className='image' src={user.avatar ? user.avatar : unLoginPng}></Image>
          </View>
          <View className='name' >
            <Text className='text animate__animated animate__backOutDown'>{user.nickname ? user.nickname : '点击登录'}</Text>
          </View>
          <View className='desc'>

          </View>
        </View>
        <View className='content'>
          {navData.map((item, index) => {
            return (
              <View className='item' onClick={(e) => {
                if (index == 2) iShowToast('功能开发中...', 'none')
                if (index == 3) iShowToast('功能开发中...', 'none')
                if (index == 4) iShowToast('功能开发中...', 'none')
                if (index == 1) {
                  queryAuthInfo().then(res => {
                    if (res.data == true) {
                      toPage(item.url)
                    } else {
                      iShowToast('完成个人信息档案后才可以进行认证!', 'none');
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                }
                else toPage(item.url)
              }} key={index}>
                <View className='box at-row'>
                  <View className='icon  at-col at-col-1'>
                    <Image src={item.img} className='image'></Image>
                  </View>
                  <View className='text at-col at-col-11'>
                    <Text className='label'>{item.name}</Text>
                    <Text className='mark'> &gt;</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <AtModal
          className='bind_phone_container'
          isOpened={this.state.bindPhoneShow}
          closeOnClickOverlay={false} >
          <AtModalHeader>完善手机号</AtModalHeader>
          <AtModalContent>
            <AtButton
              className='bind_btn'
              openType="getPhoneNumber"
              onGetPhoneNumber={this.getPhoneNumber}>

              获取手机号
            </AtButton>
            {/* <Checkbox
              className='agreenment'
              value={readAgreement}
              checked={readAgreement}>
            </Checkbox> */}
            <Text className='tips'>绑定手机号代表同意

            </Text>
            <View className='spec' onClick={(e) => { toPage('/pages/agreement/index') }}>
              《用户协议》
            </View>
          </AtModalContent>
        </AtModal>

        <AtModal
          className='bind_phone_container'
          isOpened={showAgreementBox}
          closeOnClickOverlay={true} >
          <AtModalContent>
            {agreementContent}
          </AtModalContent>
        </AtModal>

      </View>
    )
  }
}
