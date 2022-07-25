import React, { Component } from 'react';
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import "taro-ui/dist/style/components/flex.scss";
import companyPng from '../../../resource/company.png'
import artPng from '../../../resource/art.png'
import peoplePng from '../../../resource/people.png'
import { getStorageValue, toPage } from '../../../until/util';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    name: '企业',
                    desc: '企业，微小企业等',
                    url: 'company',
                    image: companyPng
                },
                {
                    name: '艺术',
                    desc: '字画、毛笔字等',
                    url: 'art',
                    image: artPng
                },
                {
                    name: '职员',
                    desc: '国企科级、律师、教师等',
                    url: 'people',
                    image: peoplePng
                },{

                }
            ],
        }
        console.log(this.props)
    }

    

    render() {
        const { data } = this.state
        const bg_url = getStorageValue('bg_url')
        return (
            <View className='container' style={{backgroundImage:'url('+bg_url+')'}}>
                <View className='content at-row at-row--wrap at-row__justify--around'>
                    {
                        data.map((item, key) => {
                            const haveNull = (item.name ? true : false)
                            if(haveNull){
                                return (
                                    <View 
                                        className='item at-col at-col-5'
                                        onClick={(e)=>{
                                            // 这里得判断能不能点击
                                            toPage('/pages/auth/'+item.url+'/index')
                                        }}    
                                    >
                                        <View className='image-box'>
                                            <Image className='image' src={item.image}></Image>
                                        </View>
                                        <View className='name'>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View className='desc'>
                                            <Text>{item.desc}</Text>
                                        </View>
                                    </View>
                                )
                            }else{
                                return (
                                    <View className='at-col at-col-5'>
                                        
                                    </View>
                                )
                            }
                            
                        })
                    }

                </View>
            </View>
        )
    }
}