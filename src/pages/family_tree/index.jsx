import React, { Component } from 'react';
import { View, Text, Picker, Image, ScrollView } from '@tarojs/components'
import './index.scss'
import { getFamilyData, queryAllYear } from './api';
import "taro-ui/dist/style/components/list.scss";
import { chunk, iShowToast, startLoading, stopLoading, toChinesNum, toPage } from '../../until/util';
import tipPng from '../../resource/img/main/tip.png';
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
// 虚拟列表
import { log } from '../../until/log';


export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // 树的数据
      familyData: [],
      // 树显示的数据
      showFamilyData: [],
      // 记录每一个scrollView的展示项
      showCurrentPage: [],
      // 选择器的原始数据
      data: [],
      // 选择器用到的数据
      yearSelector: {},
      // 选择器用到的显示的数据(Default=>obj.value)
      yearSelectorChecked: {},
      // 左侧树 第一联 年份
      leftShowYear: [],
      // 左侧树 第二联 第N世
      leftShowData: [],
      // 滑动相关的参数
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isStatus: false,
      // 当前是第几页
      currentPage: 0,
      totalPage: 0,
    }
  }

  getTreeData(ranks) {
    startLoading()
    // 测试默认值
    getFamilyData({ ranks: ranks }).then(res => {
      if (res.data.length == 0) {
        iShowToast('暂无数据', 'error')
      }
      // log(res.data)
      let showFamilyData = []
      let showCurrentPage = []
      // 存展示的
      res.data.map((item, index) => {

        if (item.length <= 10) {
          showFamilyData.push(item)
        } else {
          showFamilyData.push(item.slice(0, 10))
        }
        showCurrentPage.push(1)

      })

      // log('第一屏加载的数据', showFamilyData)
      // log(showCurrentPage)
      this.setState({
        // 全部的数据
        familyData: res.data,
        // 显示的数据
        showFamilyData: showFamilyData,
        // j记录页数
        showCurrentPage: showCurrentPage
      })
    })
    stopLoading()
  }
  // 获取全部的年份
  getAllYear() {
    queryAllYear().then(res => {
      /**
       * 将res中的数据整理成 A-B形式
       * 其中，准备两份数据，一份为显示的，一份为提交使用的
       */
      let allNumer = [];
      res.data.map((item) => {
        allNumer.push(item.number)
      })
      // 选择器所用到的数据
      let selectData = Array();
      let selectDataFirst = chunk(allNumer, 5)
      selectDataFirst.map(item => {
        let item_start = item[0];
        let item_end = item[item.length - 1];
        let item_arr = {};
        // 提交使用的
        item_arr.key = item_start + ',' + item_end
        // 展示的
        item_arr.value = toChinesNum(item_start) + '世~' + toChinesNum(item_end) + '世'
        selectData.push(item_arr)
      })

      this.setState({
        // 选择器显示的
        yearSelector: selectData,
        // 选择器默认值
        yearSelectorChecked: selectData[selectData.length - 1],
        // 请求过来的默认数据
        data: res.data,
        totalPage: selectData.length,
        currentPage: selectData.length
      })
      this.changeLeftData(selectData[selectData.length - 1])

      // 渲染树
      this.getTreeData(selectData[selectData.length - 1]['key'])
    })
  }

  // 修改左侧的显示数据  这里根据当前被选中的key来处理需要展示的数据
  changeLeftData(curr = {}) {
    let slicesArr = curr.key.split(',');

    let sourceArr = this.state.data;

    let startNum = slicesArr[0] - 1;
    let endNum = slicesArr[1];

    let res = sourceArr.slice(startNum, endNum);

    let lYears = [];
    let lData = [];
    res.map(item => {
      lYears.push(item.year)
      lData.push(item.number)
    })
    this.setState({
      // 内容区域左侧显示的年份
      leftShowYear: lYears,
      // 内容区域左侧显示的数据
      leftShowData: lData,
    })
  }

  touchStart(e) {
    e.preventDefault()
    // log('开始滑动X', e.touches[0].pageX)
    // log('开始滑动Y', e.touches[0].pageY)
    this.setState({
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY
    })
  }
  touchMove(e) {
    // log('滑动中X',e.touches[0].pageX)
    // log('滑动中Y',e.touches[0].pageY)
    this.setState({
      isStatus: true,
      endX: e.touches[0].pageX,
      endY: e.touches[0].pageY
    })
  }

  // 屏幕上下滚动
  touchEnd(e) {
    let { startX, startY, endX, endY, isStatus, currentPage, totalPage } = this.state
    let X = endX - startX,
      Y = endY - startY;
    // log('滑动结束X', X)
    // log('滑动结束Y', Y)
    if (isStatus) {
      // 只控制Y轴偏移量，避免ScrollView滚动时重复 --已修复，换成了指定区域滚动
      if (Y > 50) {
        // 向下
        if (currentPage != 0) {
          this.liftOnChange(parseInt(currentPage) - 1)
        }
      } else if (Y < -50) {
        // 向上
        if (currentPage != totalPage) {
          this.liftOnChange(parseInt(currentPage) + 1)
        }
      }
    }
  }


  liftOnChange = (num) => {
    let apiData = this.state.yearSelector[num]['key']
    let showData = this.state.yearSelector[num]['value']

    startLoading();
    let res = {
      key: apiData,
      value: showData
    }

    this.setState({
      yearSelectorChecked: res,
      currentPage: num
    })
    // 重新渲染族谱数据
    this.getTreeData(apiData)
    this.changeLeftData(res)
    stopLoading();
  }

  componentDidMount() {
    startLoading();
    this.getAllYear();
    stopLoading();
  }


  onScrollToLower = (index) => {
    // 设置每页的数量
    const pageSize = 10;

    let showData = this.state.showFamilyData
    // 当前展示的数据
    const currentData = showData[index]
    // 全部数据源
    const allData = this.state.familyData
    let showCurrentPage = this.state.showCurrentPage

    // log('当前触底的全部数据', this.state.familyData[index])
    // log('当前触底的显示数据', this.state.showFamilyData[index])
    /*
    显示数据追加
    获取后10条
    */
    // debugger
    const currentPage = showCurrentPage[index]
    const nextPage = currentPage + 1

    // log(nextLimit)
    // log('下一页的数据', nextPage)

    showCurrentPage[index] = nextPage

    // log('改变key数组', showCurrentPage)
    // 拿到下一个要展示的数据
    const nextStartLimit = currentPage * pageSize,
      nextEndLimit = nextPage * pageSize


    if (nextEndLimit >= allData[index].length) {
      log('全部加载完毕')
      return
    }

    // log(currentData);
    const nextShowData = allData[index].slice(nextStartLimit, nextEndLimit)

    // log('分隔数组', nextShowData)
    showData[index] = [...currentData, ...nextShowData]
    // log('展示的数据',allData)

    this.setState({
      showFamilyData: showData,
      showCurrentPage: showCurrentPage
    })


  }

  render() {
    const { familyData } = this.state;
    const { key, value } = this.state.yearSelector
    const showYear = this.state.leftShowYear
    let showData = this.state.leftShowData

    if (showData.length < 5) {
      let a = 5 - showData.length
      for (let i = 0; i < a; i++) {
        showData.push(null)
      }
    }

    return (
      <View className='index '

      >
        <View className='header at-row'>
          <View className='text at-row at-row__justify--between at-col at-col-7'>
            <View className=' at-col at-col-1'></View>
            <View className=' at-col at-col-1'>
              <Image src={tipPng} className='img'></Image>
            </View>
            <View className='at-col at-col-3'>
              <Text className='text title'>世系表</Text>
            </View>
            <View className='at-col at-col-6'>
              <Picker
                ref={this.picker_ref}
                className='c-picker'
                mode='selector'
                range={this.state.yearSelector}
                rangeKey='value'
                onChange={e => this.liftOnChange(e.detail.value)}
              >
                <View key={key}>
                  <Text>{this.state.yearSelectorChecked.value}</Text>
                  <Text>▼</Text>
                </View>
              </Picker>
            </View>
          </View>
          {/* <View className='search-box at-col at-col-5'>
            <AtSearchBar
              customStyle={{ border: 'none' }}
              className='search'
            />
          </View> */}
        </View>
        <View className='content  at-row'>
          <View className='info at-col at-col-3'
            onTouchStart={this.touchStart.bind(this)}
            onTouchMove={this.touchMove.bind(this)}
            onTouchEnd={this.touchEnd.bind(this)}>
            <View className='years'>
              <View className='years-content'>
                {showYear.map(item => {
                  return (
                    <View className='item-year'>
                      <Text className='text'>
                        {item < 0 && <Text className='spec'>前</Text>}
                        {item < 0 ? -item : item}
                        <Text className='spec'>年</Text>
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
            <View className='lifes'>
              <View className='lifes-content'>
                {showData.map(item => {
                  return (
                    <View className='item-life'>
                      {/* 补全剩余的空格，防止出现样式问题 */}
                      {item && (
                        <View className='item-life-box'>
                          <Text className='text'>
                            {toChinesNum(item) + '世'}
                          </Text>
                        </View>
                      )
                      }
                    </View>
                  )
                })}
              </View>
            </View>
          </View>
          <View className='tree at-col-9'>
            <View className='tree-content'>
              {this.state.showFamilyData.map((item, index) => {
                if (item.length != 0) {
                  return (
                    <ScrollView
                      id={`the_scroll_view_${index}`}
                      scrollX
                      lowerThreshold={300}
                      scrollWithAnimation
                      onScrollToLower={
                        e => this.onScrollToLower(index)
                      }
                      className='item-rank'>
                      {
                        item ? (
                          item.map(content => {

                            return (
                              <View className="info-box" onClick={(e, data) => {
                                let u_id = content.id
                                toPage('../pinfo/index?id=' + u_id)
                              }}>
                                <View className="name">
                                  <View className="label-dot" style={{ backgroundColor: '#824504' }}></View>
                                  {content.name}
                                </View>
                                {
                                  (content.abbrs != undefined && content.abbrs != null && console.abbrs != []) &&
                                  (
                                    <View className='abbrs'>
                                      {
                                        (content.realname_auth == 0) &&
                                        (
                                          <View className='label-abbr' style={{ border: '1px solid #9D0202', color: '#9D0202' }}>认</View>
                                        )
                                      }
                                      {content.abbrs.map((abbr) => {
                                        let color = '#5F9378'
                                        if (abbr == '企') color = '#446285'
                                        if (abbr == '艺') color = '#824504'
                                        return (
                                          <View className='label-abbr' style={{ border: '1px solid ' + color, color: color }}>{abbr}</View>
                                        )
                                      })}
                                    </View>
                                  )
                                }
                              </View>
                            )
                          })
                        ) : (
                          <View></View>
                        )
                      }
                    </ScrollView>
                  )
                } else {
                  return (
                    <View className='item-rank'>

                    </View>
                  )
                }

              })}
            </View>
            <View>
            </View>
          </View>
        </View>
      </View >
    )
  }
}