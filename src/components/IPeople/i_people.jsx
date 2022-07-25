import React, { Component } from "react";
import PropTypes from 'prop-types';

import IPeopleNode from './i_people';
import './i_people.scss';
import "taro-ui/dist/style/components/flex.scss";

class IPeople extends Component {


    constructor(props){
        // console.log(props)
        super(props)
    }

    componentDidMount(){
        const { data } = this.props;
    }

    /**
     * 这里
     * 数据
     * 
     * 没有
     * 处理
     * 确保
     * 传进去的
     * 不为空 空pass
     * 
     * @returns 
     */

    render(){
        const { onClick } = this.props;
        return (
            <IPeopleNode 
                onClick={(e, nodeData)=> onClick && onClick(e, nodeData)}
                {...this.props}
            />
        )
    }
}

IPeople.propsTypes = {
    userInfo: PropTypes.object,
    authAbbr: PropTypes.object,
    authData: PropTypes.object,
    onClick: PropTypes.func
}

export default IPeople;