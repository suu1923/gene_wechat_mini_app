import { RichText, View } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/taro";
import { Component } from "react";
import { formatContent, getStorageValue, iShowToast } from "../../until/util";
import { getContent } from "./api";

import './index.scss'
export default class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: ""
        }
    }
    componentDidMount(){
        let id = getCurrentInstance().router.params.id;

        if(!id) {
            iShowToast('获取数据失败!','error');
            return;
        }
        getContent(id).then(res=>{
            if(res.data == null){
                iShowToast('暂无数据!','error');
                return;
            }
            this.setState({content:res.data})
        }).catch(err=>{
            console.log(err)
            iShowToast('获取数据失败!','error');
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