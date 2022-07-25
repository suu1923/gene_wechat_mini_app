import { Component } from "react";
import { View, Text, Image, RichText } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/load-more.scss";
import "taro-ui/dist/style/components/activity-indicator.scss";
import tipPng from '../../resource/img/main/tip.png';
import './index.scss';
import { queryUserInfo } from "./api";
import { getStorageValue, iShowToast, pageBack, startLoading, stopLoading } from "../../until/util";
import IPeople from "../../components/IPeople/i_people.jsx";
import Result from "../../components/result";
import { log } from "../../until/log";

export default class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // 参数异常
            errMsg: '',
            isShow: 'none',
            // 用户基本信息
            baseInfo: {},
            // 中间部分 多选项卡
            atList: [],
            atContent: [],
            current: 0,
            // 父级
            parentData: [],
            // 子级
            childrenData: [],
            // 认证情况
            authAbbr: [],
            // 认证详情
            authData: [],
            // 展示全部
            showAll: false,
            // 默认高度
            // defaultHeightOfInfo: '300rpx'
        }
    }
    handleClick(value) {
        this.setState({
            current: value
        })

        // setTimeout(() => {
            // this.handleTextHight(value);
        // }, 500); //防止dom没有加载完成
    }


    userInfo = (id) => {
        startLoading();
        queryUserInfo(id).then(res => {
            this.setState({
                atList: res.data.atList,
                atContent: res.data.atContent,
                parentData: res.data.parent,
                childrenData: res.data.children,
                authAbbr: res.data.authAbbr,
                authData: res.data.authData,
                baseInfo: res.data.baseInfo,
                isShow: ''
            })
        }).catch(error => {
            Taro.showToast({
                title: '获取用户信息失败',
                icon: 'error',
                duration: 5000,
                mask: true,
            })
            pageBack();
        })
        stopLoading();
    }

    componentWillMount() {
        const uid = getCurrentInstance().router.params.id;
        if (!uid) {
            // 无效参数处理
            // iShowToast('参数异常', 'error');
            // return <View>112</View>
            this.setState({
                errMsg: '参数异常'
            })
            return
        } else {
            this.userInfo(uid)

        }
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.handleTextHight(0);
    //     }, 500); //防止dom没有加载完成
    // }

    handleTextHight = (index = 0) => {
        const query = Taro.createSelectorQuery()
        log('index',index)
        query.select(".r-text-"+index).fields({
            size: true
        });
        query.exec(res => {
            let _height = res[0]['height']
            console.log(_height)
            if (_height > 300) {
                this.setState({
                    showAll: true
                })
            }
        })
    }
    // showMore = () => {
    //     console.log('出发了')
    //     this.setState({
    //         defaultHeightOfInfo: 'auto',
    //         showAll: false
    //     })
    // }
    // showLess = () => {
    //     this.setState({
    //         defaultHeightOfInfo: '300rpx',
    //         showAll: true
    //     })
    // }

    render() {
        const { showAll, baseInfo, authData, authAbbr, current, atList, atContent, childrenData, parentData, errMsg, defaultHeightOfInfo } = this.state
        const lifeData = [];

        const parentDat = {
            name: '父代',
            data: [parentData]
        };
        const mySelfData = {
            name: '本人',
            data: [baseInfo],
        };
        const childrenDat = {
            name: '子代',
            data: childrenData
        }
        const childrenNum = childrenData.length
        lifeData.push(parentDat, mySelfData, childrenDat)
        const bg_url = getStorageValue('bg_url')
        return (
            <View className="contrainer" style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                {
                    (errMsg == '') ? (
                        <View className="box">

                            <View className="base">
                                <IPeople
                                    userInfo={baseInfo}
                                    authAbbr={authAbbr}
                                    authData={authData}

                                ></IPeople>
                            </View>

                            {
                                (atList != []) && (
                                    <View className="info">
                                        <AtTabs
                                            current={current}
                                            scroll
                                            tabList={atList}
                                            onClick={this.handleClick.bind(this)}
                                        >
                                            {
                                                atContent.map((item, index) => {
                                                    
                                                    return (
                                                        <AtTabsPane current={current} index={index}>
                                                            <View
                                                                className='item'
                                                                // style={{ height: defaultHeightOfInfo }}
                                                            >
                                                                <RichText className={"r-text r-text-"+index } nodes={item.content} />
                                                            </View>
                                                            {/* 显示 更多 按钮 */}
                                                            {/* {
                                                                showAll === true &&
                                                                    <View className="showmore" onClick={e=>{this.showMore(this)}}>
                                                                        <View className='at-icon tips at-icon-chevron-down'></View>
                                                                    </View>
                                                                    
                                                            } */}
                                                        </AtTabsPane>
                                                    );
                                                })
                                            }
                                        </AtTabs>
                                    </View>
                                )
                            }
                            <View className="relation">
                                <View className="r-header">
                                    <View className='left'>
                                        <Image src={tipPng} className='img'></Image>
                                        <Text className='text title'>直系字辈表</Text>
                                    </View>
                                    <View className='right'>
                                        <View className="lable-dot">子</View>
                                        {childrenNum}
                                    </View>
                                </View>
                                <View className="content">
                                    {lifeData.map((item) => {
                                        const elem = item.data;
                                        return (
                                            <View className="lifes at-row">
                                                <View className='item-life at-col-1'>
                                                    <Text className='text'>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View className="item-info at-col-11">
                                                    {elem.map((value, key) => {
                                                        return (
                                                            <View className="info-box" >
                                                                {
                                                                    (value.wife != undefined && value.wife != null && value.wife != "") &&
                                                                    (
                                                                        <View className="wife">
                                                                            {value.wife.split(',').map((v, i) => {
                                                                                return (
                                                                                    <View className="label-wife-son">
                                                                                        <View className="label-dot"></View>
                                                                                        {v}
                                                                                    </View>
                                                                                )
                                                                            })}
                                                                        </View>
                                                                    )
                                                                }
                                                                {
                                                                    (value.name != null && value.name != '') &&
                                                                    (
                                                                        <View className="name">
                                                                            <View className="label-dot"></View>
                                                                            {value.name}
                                                                        </View>
                                                                    )
                                                                }
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    ) : (
                        <Result content={errMsg}></Result>
                    )
                }
            </View>
        )
    }

}