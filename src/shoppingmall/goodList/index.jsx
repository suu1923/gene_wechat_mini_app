import { Component } from "react";
import Taro from '@tarojs/taro'
import { AtSearchBar, AtDrawer } from 'taro-ui'
import { View, Image, Text } from '@tarojs/components'

import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/drawer.scss";
import "taro-ui/dist/style/components/list.scss";

import "./index.scss"
import { queryCategoryList } from "./api";


export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 商品列表
            goodList: [],
            // 分类数据
            categoryList: [],
            // 当前搜索值
            searchText: '',
            // 是否展示分类
            categoryShowStatus: false,
            // 当前选中的分类，默认为空
            currentCategoryId: ''
        }
    }


    componentWillMount() {
        // 获取分类数据
        // 获取商品列表数据
        this.getCateGoryList();
    }
    onChange(value) {
        this.setState({
            searchText: value
        })
    }
    onActionClick() {
        console.log('开始搜索')
    }

    // 获取分类列表
    getCateGoryList = () => {
        queryCategoryList().then(res => {
            console.log(res.data)
            this.setState({
                categoryList: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
    // 展示分类列表
    showCategoryList = () => {
        console.log(123);
        this.setState({
            categoryShowStatus: true
        })
    }
    // 选中菜单后的事件
    onDrawerChange(item){
        console.log(item)
    }
    render() {
        const { goodList, categoryList } = this.state
        return (
            <View className='container'>
                <View className='content'>
                    <View className="fixed-top">
                        <View className='top at-row'>
                            <View className='search at-col at-col-11'>
                                <AtSearchBar
                                    actionName='点击搜索'
                                    value={this.state.searchText}
                                    onChange={this.onChange.bind(this)}
                                    onActionClick={this.onActionClick.bind(this)}
                                />
                            </View>
                            <View className="category at-col at-col-1">
                                <View className='category_btn at-icon at-icon-menu' onClick={this.showCategoryList.bind(this)}></View>
                            </View>
                        </View>
                        <AtDrawer
                            show={this.state.categoryShowStatus}
                            mask
                            right={true}
                            width="80%"
                        >
                            <View className="categort-title">全部类目</View>
                            <View className="category-list">
                                {categoryList.map((item, index) => {
                                    return (
                                        <View className="category-item" onClick={(e)=>this.onDrawerChange(item.id)}>
                                            <View className="category-content at-row">
                                                <Image src={item.image} className='category-img'></Image>
                                                <Text className="category-name">{item.name}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </AtDrawer>
                    </View>
                    <View className="list">

                    </View>
                </View>
            </View>
        )
    }
}