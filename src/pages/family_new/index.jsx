import React, { Component } from "react";
import { View, Text, Picker, Image, ScrollView } from "@tarojs/components";
import "./index.scss";
import "taro-ui/dist/style/components/list.scss";
import {
  chunk,
  iShowToast,
  startLoading,
  stopLoading,
  toChinesNum,
  toPage,
} from "../../until/util";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";

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
        name: "张三",
        img: "https://php-web-gene.oss-cn-shenzhen.aliyuncs.com/test/1.jpg",
      },
      {
        id: 2,
        name: "李四",
        img: "https://php-web-gene.oss-cn-shenzhen.aliyuncs.com/test/2.png",
      },
      {
        id: 2,
        name: "李四",
        img: "https://php-web-gene.oss-cn-shenzhen.aliyuncs.com/test/2.png",
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
                <Image
                  src={item.img}
                  mode="scaleToFill"
                  style={{
                    width: "100%",
                    height: "100%",
                    boxShadow: "4px 4px 14px 0px #807f7f",
                    borderRadius: "5%",
                  }}
                ></Image>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
