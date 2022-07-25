import { Component } from 'react';
import { AtButton } from 'taro-ui'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import Taro from '@tarojs/taro'
import "taro-ui/dist/style/components/fab.scss";

import './index.scss'
import { pay } from './api';

export default class Index extends Component {


    constructor(props) {
        super(props)
    }


    // 支付的，最后弄出去
    confirmPay = () => {
        pay().then(res => {
            // console.log(res)
            Taro.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                
                success: function (res) {
                    console.log(res)
                    console.log('支付成功')
                },
                fail: function (err) {
                    console.log(err)
                    console.log('支付失败')
                }         
            })
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        return (
            <View>
                <AtButton onClick={this.confirmPay}>点击支付</AtButton>
                <AtFab className='add_btn'>
                    <Text className='at-fab__icon at-icon at-icon-add'></Text>
                </AtFab>
            </View >
        )
    }
}