import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { getNoticeList } from './api'
import Taro from '@tarojs/taro'

import './index.scss'
import { getStorageValue, startLoading, stopLoading, toPage } from '../../until/util'

export default class Index extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      noticeListData : []
    }
  }

  componentWillMount() {

    startLoading();
    getNoticeList().then( (res) => {
      this.setState({ noticeListData: res.data })
    }).catch(err => {
      Taro.showToast({
        title:'获取数据失败!'
      })
    });

    stopLoading();
  }

  render() {
    const { noticeListData } = this.state;
    const bg_url = getStorageValue('bg_url')
    return (
      <View className='container' style={{backgroundImage:'url('+bg_url+')'}}>
        <View className='content'>
          {
            (noticeListData != []) ? (
              noticeListData.map((item,index)=>{
                return (
                  <View className='item' key={index} onClick={(e,data)=>{toPage('./info?notice_id='+item.id)}}>
                    <View className='content2'>
                      <View className='title'>
                        <Text className='dot'>·</Text>
                        {item.title}
                      </View>
                      <View className='desc'>{item.desc}</View>
                      <View className='text'>
                        <Text className='publicser'>管理员发布</Text>
                        <Text className='createtime'>{item.createtime}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            
            ): <View>暂无数据</View>
          }
        </View>
      </View>
    )
  }
}