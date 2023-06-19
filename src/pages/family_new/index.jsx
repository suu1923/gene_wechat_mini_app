import React, { Component } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import TimelineComponent from "../../components/custom-timeline/TimelineComponent";
import { getFamilyGroupData } from "./api";
import { eventCenter, getCurrentInstance, nextTick } from "@tarojs/taro";
import { toPage } from "../../until/util";

export default class Index extends Component {
  $instance = getCurrentInstance()
  constructor(props) {
    super(props);
    this.state = {
      familyData: [],
    };
  }

  componentWillMount() {
    const onReadyEventId = this.$instance.router.onReady
    eventCenter.once(onReadyEventId, () => {
      console.log('onReady')
      this.getFamilyList();
    })
  }

  getFamilyList = async () => {
    try {
      const { data } = await getFamilyGroupData();
      console.log('data', data);
      this.setState({ familyData: data });

    } catch (e) {
      Taro.showToast({
        title: '获取数据失败',
        icon: 'error',
        duration: 2000
      })
      console.log(e)
    }
  }
  handleItemClick(item) {
    // 处理点击事件
    console.log('点击了:', item);
    toPage('new_tree/index?id=' + item.id)
  }
  render() {
    const { familyData } = this.state;
    if (!familyData) {
      return null;
    }
    return (
      <View className="container">
        <TimelineComponent
          data={familyData}
          color="#E7C48D"
          onItemClick={this.handleItemClick.bind(this)}
        />
      </View>
    );
  }
}
