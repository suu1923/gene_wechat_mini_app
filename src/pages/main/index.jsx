import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss';
import { AtGrid } from "taro-ui"

import "taro-ui/dist/style/components/flex.scss";
import { getArticleList, getBanner, getNavList, queryFamousNavList } from './api'
import tipPng from '../../resource/img/main/tip.png';
import { toPage } from '../../until/util';
import "taro-ui/dist/style/components/grid.scss";
import 'taro-skeleton/dist/index.css'
import { error, log } from '../../until/log';
import Result from '../../components/result';
import Taro from '@tarojs/taro';

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bannerData: [],
      bannerErr: '',
      current: 0,
      navData: [],
      artList: [],
      famousNavData: [],
      famousNavDataErr: '',
      lineNav: [],
      lineNavErr: []
    }
  }

  componentDidMount() {
    // 调取接口首页
    this.getBannerData();
    // 获取导航
    this.getNavData();
    // 调取文章接口
    this.getArticleData();
    // 名人导航接口
    this.getFamousNavData();

    // 测试
    Taro.request({
      url:'http://192.168.1.42/test/public/',
      success: function(res){
        console.log('本地数据')
        console.log(res.data)
      }
    })
  }

  getFamousNavData = async () => {
    await queryFamousNavList().then(res => {
      this.setState({
        famousNavData: res.data
      })
    }).catch(err => {
      this.setState({ famousNavDataErr: err })
    })
  }

  getBannerData = async () => {
    await getBanner().then(res => {
      this.setState({ bannerData: res.data })
    }).catch(err => {
      error('轮播图异常', err)
      this.setState({ bannerErr: err })
    })

  }

  getArticleData = async () => {
    const query = {
      pageSize: 3
    }
    await getArticleList(query).then((res) => {
      this.setState({ artList: res.data.data })

    }).catch(err => {
      console.log(err)
    })
  }

  getNavData = async () => {
    await getNavList().then((res) => {


      let count_swiper = Array();
      const total_swiper = Math.ceil(res.data.top.length / 8);
      for (let i = 1; i <= total_swiper; i++) {
        let current_swiper = Array()
        res.data.top.map((item, index) => {
          if (i == Math.ceil((index + 1) / 8)) {
            current_swiper.push(item)
          }
        })
        count_swiper.push(current_swiper)
      }
      this.setState({
        navData: count_swiper,
        lineNav: res.data.bottom
      })
    }).catch(err => {
      console.log('导航栏错误')
      console.log(err)
    })
  }


  navToPage(item) {
    // 直接跳转页面
    if (item.type != 2) {
      toPage('/common/pages/single_page/index?id=' + item.id + '&title=' + item.value)
    } else {
      toPage(item.url)
    }
  }

  render() {
    const { bannerData, bannerErr, navData, artList, display, famousNavData, famousNavDataErr, lineNav } = this.state;
    log('bannnerData', bannerData)
    return (
      <View className='index'>
        {/* 第一个模块 */}
        <View className='header'>
          <View className='banner'>
            {
              bannerErr == '' ?
                bannerData != [] ? (
                  <Swiper
                    className='banner-box'
                    circular
                  >
                    {bannerData.map((item, index) => {
                      return (<SwiperItem>
                        <View className='swiper-item' key={index} style={{
                          background: 'url(' + item + ')',
                          backgroundSize: '100% 100%',
                          backgroundRepeat: 'no-repeat'
                        }}
                        ></View>
                      </SwiperItem>)
                    })}
                  </Swiper>
                ) : (
                  <Result type='2' />)
                : (
                  <Result content={bannerErr} />
                )

            }
          </View>
          <View className='nav'>
            <Swiper
              className='nav-box'
              indicatorColor='#999'
              indicatorActiveColor='#9D0202'
              indicatorDots
              displayMultipleItems='1'
            >
              {navData.map((item, index) => {
                // 这里判断个数
                return (
                  <SwiperItem key={index} className='nav-item'>
                    <AtGrid
                      mode='square'
                      data={item}
                      columnNum='4'
                      hasBorder={false}
                      onClick={e => this.navToPage(e)}
                    ></AtGrid>
                  </SwiperItem>
                );
              })}
            </Swiper>
          </View>
        </View>
        {/* 第二个模块 */}
        <View className='famous-box'>
          <View className='header'>
            <View className='left'>
              <Image src={tipPng} className='img'></Image>
              <Text className='text title'>名人馆</Text>
            </View>
          </View>
          <View className='content'>
            {
              famousNavDataErr == '' ?
                famousNavData != [] ? (
                  famousNavData.map((item, index) => {
                    return (
                      <View className='famous-nav-item' style={{ background: 'url(' + item.image + ')', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }} onClick={(e) => toPage('/pages/people_list/index?type=' + item.url)}></View>
                    )
                  })
                ) : (<Result type='2' />)
                : <Result content={famousNavDataErr} />
            }
          </View>
        </View>

        {/* 新模块,也是单页面内容 */}
        {lineNav != [] && (
          <View className='line-box'>
            {
              lineNav.map((item, index) => {
                return (
                  <View
                    className='line-item'
                    onClick={
                      e => this.navToPage(item)
                    }>
                    <Image src={item.image} />
                  </View>
                )
              })
            }
          </View>
        )}

        {/* 第三个模块，文章 */}
        <View className='article-box'>
          <View className='header'>
            <View className='left'>
              <Image src={tipPng} className='img'></Image>
              <Text className='text title'>动态推荐</Text>
            </View>
            <View className='right'>
              <Text onClick={e => toPage('/pages/article/index')}>更多 &gt;</Text>
            </View>
          </View>
          <View className='content'>
            {artList.map((item, index) => {
              return (
                <View className='item' key={index} onClick={e => toPage('/pages/article/detail/index?id=' + item.id)}>
                  <View className='at-row'>
                    <View className='at-col-7 left'>
                      <View className='a-title'>
                        {item.title}
                      </View>
                      <View className='a-description'>
                        {item.desc}
                      </View>
                      <View className='a-createtime'>
                        {item.create_time_text}发布
                      </View>
                    </View>
                    <View className='at-col-1'></View>
                    <View className='at-col-4 img-box'>
                      <Image src={item.thumbnail_image} style={{ width: '200rpx', height: '200rpx' }} className='img-item'></Image>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    )
  }
}
