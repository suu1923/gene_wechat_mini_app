
import { Component } from 'react'
import { View, RichText } from '@tarojs/components'
import { getNavContent } from './api'
import { getCurrentInstance } from '@tarojs/taro'
import { formatContent, getStorageValue, iShowToast, setPageTitle } from '../../../until/util'

import './index.scss'


export default class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: "",
        }

    }

    componentWillMount() {

        const nav_id = getCurrentInstance().router.params.id
        const nav_name = getCurrentInstance().router.params.title
        setPageTitle(nav_name)

        getNavContent(nav_id).then((res) => {
            this.setState({ data: res.data.content })
        }).catch(err => {
            iShowToast(err, 'error')
        });
    }

    render() {
        const { data } = this.state;
        console.log(data)
        const bg_url = getStorageValue('bg_url')
        console.log(bg_url)
        return (
            <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                <View className='content'>
                    <RichText className='info' nodes={formatContent(data)} />
                </View>
            </View>
        )
    }
}