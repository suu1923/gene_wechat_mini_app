import { RichText, View } from "@tarojs/components";
import { Component } from "react";
import { formatContent, getStorageValue, iShowToast, startLoading, stopLoading } from "../../until/util";
import { usersCustomAgreement } from "./api";

import './index.scss'
export default class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: ""
        }
    }
    componentWillMount(){
        startLoading()
        usersCustomAgreement().then(res=>{
            if(res.data == null){
                iShowToast('暂无数据!','error');
                return;
            }
            this.setState({content:res.data})
            stopLoading()
        }).catch(err=>{
            console.log(err)
            iShowToast('获取数据失败!','error');
            stopLoading()
            return;
        })
    }

    render() {
        const { content } = this.state
        const bg_url = getStorageValue('bg_url')

        return (
            <View class='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                <View class='content'>
                    <RichText nodes={formatContent(content)}/>
                </View>
            </View>
        )
    }
}