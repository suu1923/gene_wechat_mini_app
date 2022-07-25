import React, { Component } from 'react';
import { View, RichText } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro';
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/flex.scss";

import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";

import { getArticleInfo } from '../api';
import { getCurrentInstance } from '@tarojs/taro';
import { formatContent, getStorageValue, startLoading, stopLoading } from '../../../until/util';

export default class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: {},
            value: ''
        }
    }
    componentDidMount() {
        let article_id = getCurrentInstance().router.params.id;

        startLoading();
        getArticleInfo(article_id).then(res => {
            let data = res;
            this.setState({ data: data })
            Taro.hideLoading()
        }).catch(err => {
            console.log(err)
            Taro.showToast({
                title: '获取数据失败',
                icon: 'error',
                duration: 1000
            })
            return;
        })
        stopLoading()

    }
    onChange(value) {
        this.setState({
            value: value
        })
    }
    render() {
        const { title, content } = this.state.data;
        const bg_url = getStorageValue('bg_url')
        return (
            <View className='container' style={{backgroundImage:'url('+bg_url+')'}}>
                <View className='content'>
                    <View className='title'>
                        {title}
                    </View>
                    <View className='info'>
                        <RichText className='info' nodes={formatContent(content)} />
                    </View>
                </View>
                {/* 
                <View className='operate'>
                    <View className='at-row box'>
                        <View className='comment at-col-6'>
                            <AtSearchBar
                                actionName='发送'
                                value={this.state.value}
                                onChange={this.onChange.bind(this)}
                            />
                        </View>
                        <View className='at-col-1'></View>
                        <View className='like at-col-2 at-icon at-icon-heart'>
                            22
                        </View>
                        <View className='favorite at-col-2 at-icon at-icon-star'>
                            22
                        </View>

                    </View>
                </View> */}
            </View>

        )
    }
}