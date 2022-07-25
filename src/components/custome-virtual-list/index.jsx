import { ScrollView, View } from "@tarojs/components";
import React, { Component } from "react";


export default class CustomVirtualList extends Component {

    defaultProps = CustomVirtualList.defaultProps

    constructor(props) {
        super(props)
        this.state = {
            // 全部数据
            allData: [],
            // 当前页码
            currentPage: 1,
            // 当前数据
            currentShowData: [],
            // 是否加载完毕
            isComplete: false
        }
    }

    componentDidMount() {

    }

    render() {

        const {
            scrollY
        } = this.props


        return (
            <ScrollView
                scrollX

            >

            </ScrollView>
        )
    }
}

CustomVirtualList.defaultProps = {
    list: [],
    pageSize: 10,
    onRender: function render() {
        return (<View></View>)
    }
}