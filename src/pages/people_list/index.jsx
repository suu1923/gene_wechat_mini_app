import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View } from '@tarojs/components'
import './index.scss';
import { getStorageValue, iShowToast, startLoading, stopLoading, toPage } from '../../until/util';
import { queryUserList } from './api';
import IPeople from '../../components/IPeople/i_people.jsx';
import { AtSearchBar } from 'taro-ui';
import Result from '../../components/result';
import TaroScrollBar from '../../components/taro-scrollbar';
export default class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userList: [],
            currPage: 1,
            totalPage: 0,
            type: '',
            search_name: ''
        }
    }

    getList = (param, addModel) => {
        startLoading();
        const add = (addModel === true) ? true : false;
        const params = { ...param }
        queryUserList(params).then((res) => {

            const totlaPage = Math.ceil(res.data.total / res.data.per_page);
            // 这里得判断一下是不是追加的数据
            let apiData = res.data.data;
            let resourceData = this.state.userList
            if (add === true) {
                resourceData.push.apply(resourceData, apiData)
            } else {
                resourceData = apiData
            }

            this.setState({
                userList: resourceData,
                currPage: res.data.current_page,
                totalPage: totlaPage,
            })
            stopLoading()
        }).catch(err => {
            iShowToast('获取数据异常', 'error')
        })
    }

    componentWillMount() {
        const types = {
            1: '现代名人馆',
            2: '企业名人馆',
            3: '艺术名人馆',
            4: '历史名人馆'
        }
        const type = getCurrentInstance().router.params.type;
        if (!type) {
            // 无效参数处理
            iShowToast('数据异常', 'error');
            return;
        }
        if (types[type] == undefined) {
            iShowToast('数据异常', 'error');
            return;
        }

        Taro.setNavigationBarTitle({
            title: types[type]
        })

        this.setState({
            type: type
        })

        // 这里最后换成type
        this.getList({ page: this.state.currPage, type: type }, false)
    }

    down = () => {
        this.setState({
            search_name: ''
        })
        this.getList({ page: 1, type: this.state.type }, false);
    }
    // 滑动到最底部的时候
    onScrollToLower = () => {
        const { currPage, totalPage, type } = this.state;

        if (currPage >= totalPage) {
            Taro.showToast({
                title: '没有数据了',
                icon: 'none'
            })
            return;
        }
        this.getList({ page: (currPage + 1), type: type }, true);
    }
    onSearchValueChange(value) {
        this.setState({
            search_name: value
        })
    }
    onSearchBtnClick() {
        if (this.state.search_name != '' || this.state.search_name != undefined) {
            this.getList({ page: this.state.currPage, type: this.state.type, name: this.state.search_name }, false)
        }
    }
    render() {
        const { userList } = this.state
        const bg_url = getStorageValue('bg_url')
        let showErr = (userList.length > 0) ? true : false
        return (
            <View >
                <AtSearchBar
                    className='search-bth'
                    actionName='搜索'
                    value={this.state.search_name}
                    onChange={this.onSearchValueChange.bind(this)}
                    showActionButton
                    onActionClick={this.onSearchBtnClick.bind(this)}
                />
                <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                    <TaroScrollBar down={this.down} loadMore={this.onScrollToLower}>
                        {
                            showErr ?
                                <View className='list-box'>
                                    {userList.map((item, key) => {
                                        return (
                                            <View className='list'>
                                                <IPeople
                                                    userInfo={item.userInfo}
                                                    authAbbr={item.authAbbr}
                                                    authData={item.authData}
                                                    onClick={(e, data) => {
                                                        let u_id = item.userInfo.id
                                                        // 跳转到详情
                                                        toPage('../pinfo/index?id=' + u_id)
                                                    }}
                                                ></IPeople>
                                            </View>
                                        )
                                    })}
                                </View>
                                :
                                <Result type='2'></Result>
                        }
                    </TaroScrollBar>
                </View>
            </View>
        )
    }
}