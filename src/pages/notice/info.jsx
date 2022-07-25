import Taro, { getCurrentInstance } from "@tarojs/taro";
import { Component } from "react";


import { View, RichText } from '@tarojs/components'
import { getNoticeDataById } from "./api";
import './info.scss';
import { formatContent, getStorageValue, startLoading, stopLoading } from "../../until/util";


export default class Info extends Component{


    constructor(props){
        super(props)
        this.state = {
            currentData : []
        }
    }

    componentDidMount(){
        let notice_id = getCurrentInstance().router.params.notice_id;
        
        startLoading();
        getNoticeDataById(notice_id).then(res=>{
            this.setState({ currentData: res.data })
            Taro.hideLoading()
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
            Taro.showToast({
                title:'获取数据失败',
                icon: 'error',
                duration : 1000
            })
        })
        stopLoading();
        
    }

    render(){
        const { title, content } = this.state.currentData;
        const bg_url = getStorageValue('bg_url')
        return(
            <View className="container" style={{backgroundImage:'url('+bg_url+')'}}>
                <View className="box">
                    <View className="title">
                        {title}
                    </View>
                    <View className="content">
                        <RichText nodes={formatContent(content)}/>
                    </View>
                </View>
            </View>
        )
    }
}