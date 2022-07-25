import { Component } from "react";
import { getStorageValue } from "../../until/util";
import { View, Text } from '@tarojs/components'
import { queryMyNotification } from "./api";

import Skeleton from "taro-skeleton";

import 'taro-skeleton/dist/index.css'

import './index.scss'
import Result from "../../components/result";

export default class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            // 消息列表
            notificationList: [],
            // 错误标识
            errFlag: false
        }
    }

    componentWillMount() {
        queryMyNotification().then(res => {
            this.setState({
                notificationList: res.data.data,
                loading: false
            })

        }).catch(err => {
            this.setState({
                errFlag: true,
                loading: false
            })
        })
    }

    renderErr = (content) => {
        return (
            <Result content={content} />
        )
    }

    render() {
        const { notificationList, loading, errFlag } = this.state
        const bg_url = getStorageValue('bg_url')

        return (
            <Skeleton
                loading={loading}
                className="sk-content"
                row={10}
                rowHeight={50}
            >
                <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                    <View className='content'>
                        {
                            this.state.errFlag === false ? (
                                notificationList.length > 0 ? (
                                    notificationList.map((item, index) => {
                                        return (
                                            <View className='item'>
                                                <Text className="item-data"><Text className="un-read">·</Text>{item.data}</Text>
                                            </View>
                                        )
                                    })
                                ) : (
                                    <Result content={'没有数据'} />
                                )
                            ) : <Result content={'网络错误'} />
                        }
                    </View>
                </View>

            </Skeleton>
        )
    }
}