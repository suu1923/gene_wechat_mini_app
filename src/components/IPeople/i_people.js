import React from "react";

import { View, Text, Image } from '@tarojs/components'
import { toPage } from "../../until/util";

export const renderNode = (data, prop) => {

    const { userInfo, authAbbr, authData, onClick } = prop;
    const { name, birthplace, desc, avatar } = userInfo

    const authDataNodes = renderAuthInfo(authData);
    const authAbbrNodes = renderAuthAbbr(authAbbr);
    const avatarNodes = renderAvatar(avatar)
    const placeNodes = renderPlace(birthplace)
    const descNodes = renderDesc(desc)

    return (
        <View className="my-people-containe" onClick={(e) => onClick(e, data)} >
            <View className="header at-row">
                <View className="detail at-col at-col-7">
                    <View className="name">
                        <View className="value">{name}
                        </View>
                        <View className="abbrs">{authAbbrNodes}</View>
                    </View>
                    {placeNodes}
                    {descNodes}
                </View>
                {avatarNodes}
            </View>
            {authDataNodes}
        </View>
    )
}

export const renderAvatar = (avatar) => {
    if (avatar != "" && avatar != null && avatar != undefined) {
        return (
            <View className="avatar at-col at-col-5">
                <Image src={avatar} className='img'></Image>
            </View>
        )
    } else {
        return <View></View>
    }
}

export const renderPlace = (place) => {
    if (place != "" && place != null && place != undefined) {
        return (
            <View className="place">
                <Text>{place}</Text>
            </View>
        )
    } else {
        return <View></View>
    }
}

export const renderDesc = (desc) => {
    if (desc != "" && desc != null && desc != undefined) {
        const subDesc = desc.substring(0,54)+(desc.length > 55 ? '......' : '')
        return (
            <View className="desc">
                {subDesc}
            </View>
        )
    } else {
        return <View></View>
    }
}

export const renderAuthAbbr = (data) => {
    const authAbbr = data ? data : []
    const res = [];
    authAbbr.map((item, key) => {
        if (item.value != "") {
            let color = getColors(item['key']);
            const elem = <Text className="label-dot" style={{ border: "1px solid " + color, color: color }}>{item.value}</Text>;
            res.push(elem)
        }
    })
    return res;
}

export const renderAuthInfo = (data) => {
    const authData = data ? data : [];

    if (authData != []) {
        return (
            <View className="auth">
                <View className="auth-content">
                    {authData.map((item, key) => {
                        if (item.name != "") {
                            let color = getColors(item['key'], 0.3);
                            return (
                                <View className="auth-item" onClick={(e)=>toPage('../auth_info/index?id='+item.id)} style={{ backgroundColor: color }} key={key}>
                                    <View className="auth-name-box">
                                        <Text className="auth-name">{item.name}</Text>
                                        <Text className="auth-big-name">{item.big_name}</Text>
                                    </View>
                                    <View className="auth-desc">
                                        <Text className="auth-desc-data">{item.desc}</Text>
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
            </View>
        )
    } else {
        return;
    }
}



/**
 * 后期可以把key-value抽出到单独的JS配置文件中，方便管理
 * @desc 获取颜色
 * @param {key值} key 
 * @param {透明度值} num default 1
 * @returns 
 */
export const getColors = (key, num) => {
    const opacity = num ? num : 1;
    const colors = {
        1: 'rgba(55,127,252, ' + opacity + ')',
        2: 'rgba(202, 137, 94, ' + opacity + ')',
        3: 'rgba(157, 2, 2, ' + opacity + ')'
    }
    return colors[key];
}

export const render = (props) => {
    return renderNode(props.data, props)
}

export default render;