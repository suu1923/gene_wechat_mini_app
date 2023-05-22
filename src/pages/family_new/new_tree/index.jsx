import { Component } from "react";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";

import "./index.scss";
import FamilyTree from "../../../components/family-tree/FamilyTree";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const generateRandomFamilyData = (depth = 0) => {
      if (depth >= 3) {
        return [];
      }

      const getRandomSex = () => Math.floor(Math.random() * 2) + 1;
      const getRandomName = () => {
        const names = [
          "Alice",
          "Bob",
          "Charlie",
          "David",
          "Eva",
          "Frank",
          "Grace",
          "Henry",
          "Ivy",
          "Jack",
        ];
        return names[Math.floor(Math.random() * names.length)];
      };

      const children = [];
      const childCount = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < childCount; i++) {
        const childData = {
          name: getRandomName(),
          sex: getRandomSex(),
          children: generateRandomFamilyData(depth + 1),
        };
        children.push(childData);
      }

      return children;
    };

    const familyData = {
      name: "Family Root",
      sex: 0,
      children: generateRandomFamilyData(),
    };
    return (
      // 构建一个树，第一个节点在最上面，其余的左右排列
      <View>
        <FamilyTree data={familyData} />
      </View>
    );
  }
}
