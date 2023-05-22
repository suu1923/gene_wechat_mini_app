import React, { Component } from "react";
import { ScrollView, View } from "@tarojs/components";
import "./index.scss";
import TimelineComponent from "../../components/custom-timeline/TimelineComponent";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyData: [
        {
          id: 1,
          name: "总谱",
          desc: "1-30世",
        },
        {
          id: 1,
          name: "总谱2",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "腾阳丁氏",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "淄博丁氏",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "济南丁氏",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "枣庄丁氏",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "枣庄丁氏",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "济宁丁氏",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "莱芜丁氏",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "莱芜丁氏2",
          desc: "始于1200年",
        },
        {
          id: 1,
          name: "莱芜丁氏3",
          desc: "始于1200年",
        },
      ],
    };
  }

  componentDidMount() {
    // this.getFamilyList();
  }

  getFamilyList() {
    // Mock数据，后期需要修改
    // 格式为id,name,img
    const mockData = [];
    this.setState({ familyData: mockData });
  }

  render() {
    const timelineData = [
      // {
      //   text: "Started working on the app-ideas repository",
      //   date: "February 25 2019",
      //   category: {
      //     tag: "app-ideas",
      //     color: "#FFDB14",
      //   },
      //   link: {
      //     url: "https://github.com/florinpop17/app-ideas",
      //     text: "Check it out on GitHub",
      //   },
      // },
      ...this.state.familyData.map((item) => ({
        text: item.name,
        date: item.desc,
        category: {
          tag: "",
          color: "",
        },
        link: {
          url: "",
          text: "",
        },
      })),
      // Add more timeline data here...
    ];
    return (
      // <ScrollView scroll-y={true}>
      <View>
        <TimelineComponent timelineData={timelineData} />
      </View>
    );
  }
}
