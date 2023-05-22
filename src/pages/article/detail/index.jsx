import React, { Component } from 'react';
import { View, RichText } from '@tarojs/components'
import Taro from '@tarojs/taro';

import { getArticleInfo } from '../api';
import { getCurrentInstance } from '@tarojs/taro';
import { formatContent, getStorageValue, startLoading, stopLoading } from '../../../until/util';


import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";

import './index.scss'

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
            <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                <View className='content'>
                    <View className='title'>
                        {title}
                    </View>
                    <View className='info'>
                        <RichText className='info' nodes={formatContent(content)} />
                    </View>
                </View>
            </View>
        )
    }
}