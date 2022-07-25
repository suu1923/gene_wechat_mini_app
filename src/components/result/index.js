import { useState } from "react";
import { View, Image, Text } from '@tarojs/components'
import "taro-ui/dist/style/components/divider.scss";

import errImage from '../../resource/err.png'
import nullImage from '../../resource/null.png'

import './index.scss'


export default function Result(props) {

    const _default = {
        content: '数据为空',
        type: 1,
        img: errImage,
    }



    const [content, setContent] = useState({
        img: (props.type == 2) ? nullImage : errImage,
        content: (props.type == 2) ? props.content ? props.content : _default.content : props.content
    })

    return (
        <View className="err-content">
            <View className="err-image"><Image src={content.img} /></View>
            <View className="err-tips"><Text>{content.content}</Text></View>
        </View>
    )

}