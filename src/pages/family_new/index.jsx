import React, { Component } from "react";
import { View, Image, ScrollView } from "@tarojs/components";
import {
  toPage,
} from "../../until/util";


import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyData: [],
    };
  }

  componentDidMount() {
    this.getFamilyList();
  }

  getFamilyList() {
    // Mock数据，后期需要修改
    // 格式为id,name,img
    const mockData = [
      {
        id: 1,
        name: "总谱",
        desc: "1-30世",
      },
      {
        id: 1,
        name: "总谱",
        desc: "始于1200年"
      },
      {
        id: 1,
        name: "腾阳丁氏",
        desc: "始于1200年"
      }, {
        id: 1,
        name: "淄博丁氏",
        desc: "始于1200年"
      }, {
        id: 1,
        name: "济南丁氏",
        desc: "始于1200年"
      }, {
        id: 1,
        name: "枣庄丁氏",
        desc: "始于1200年"
      }, {
        id: 1,
        name: "济宁丁氏",
        desc: "始于1200年"
      },
      {
        id: 1,
        name: "莱芜丁氏",
        desc: "始于1200年"
      },
    ];
    this.setState({ familyData: mockData });
  }

  render() {
    return (
      <View
        className="index"
        style={{ background: "#dcdcdc", height: "100vh", width: "100%" }}
      >
        <View
          className="content at-row at-row--wrap at-row__justify--around"
          style={{
            width: "96%",
            margin: "0 auto",
            paddingTop: "20rpx",
          }}
        >
          {/* 循环familyData */}
          {this.state.familyData.map((item, index) => {
            return (
              <View
                className="item at-col at-col-3"
                key={index}
                style={{ height: "300rpx" }}
                onClick={(e) =>
                  toPage("/pages/family_new/new_tree/index?id=" + item.id)
                }
              >
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
