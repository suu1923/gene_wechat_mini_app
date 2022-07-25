import React, { Component } from 'react';
import Taro from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { AtLoadMore, AtCard } from 'taro-ui';
import './index.scss';
import { getArticleList } from './api';
import { getStorageValue, startLoading, stopLoading, toPage } from '../../until/util';

import TaroScrollbar from '../../components/taro-scrollbar/index';


import "taro-ui/dist/style/components/card.scss";


export default class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            currPage: 1,
            totalPage: 0,
            refresherTriggered: false,
            atOpen: true,
            status: 'more',

        }
    }

    componentDidMount() {

        this.getList();

    }

    getList = (param, addModel) => {
        startLoading();
        const add = (addModel === true) ? true : false;
        const params = { ...param }
        getArticleList(params).then(res => {
            console.log(res.data)
            const totlaPage = Math.round(res.data.total / res.data.per_page);
            console.log(totlaPage)
            // 这里得判断一下是不是追加的数据
            let apiData = res.data.data;
            let resourceData = this.state.data
            if (add === true) {
                resourceData.push.apply(resourceData, apiData)
            } else {
                resourceData = apiData
            }
            this.setState({
                data: resourceData,
                currPage: res.data.current_page,
                totalPage: totlaPage,
            })
            Taro.hideLoading();
        }).catch(err => {
            console.log(err)
        })
        stopLoading();
    }

    down = () => {
        this.getList();
    }

    loadMore = () => {
        const { currPage, totalPage } = this.state;
        if (currPage >= totalPage) {
            Taro.showToast({
                title: '没有更多了',
                icon: 'none'
            })
            return;
        }
        this.getList({ page: currPage + 1 }, true);
    }

    render() {
        const { data} = this.state;
        const bg_url = getStorageValue('bg_url')
        return (
            <View className='scrollview' style={{backgroundImage:'url('+bg_url+')'}}>
                <TaroScrollbar down={this.down} loadMore={this.loadMore}>
                    <View className='container'>
                        {data.map((item, index) => {
                            return (
                                <View className='item' key={index} onClick={(e) => { toPage('/pages/article/detail/index?id=' + item.id) }}>
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
                </TaroScrollbar>
            </View>
        )
    }
}