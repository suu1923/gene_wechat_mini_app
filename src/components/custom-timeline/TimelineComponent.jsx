import React, { Component } from 'react'
import { View, Text } from "@tarojs/components";
import "./TimelineComponent.scss";

class TimelineComponent extends Component {
  constructor(props) {
    super(props); // 确保调用了父类的构造函数并传递了 props 参数
  }
  render() {
    const { timelineData } = this.props;

    return (
      <View className="timeline-container">
        {timelineData.map((data, idx) => (
          <View className="timeline-item" key={idx}>
            <View
              className="timeline-item-content"
              style={{ backgroundColor: data.category.color }}
            >
              <Text className="tag">{data.category.tag}</Text>
              <Text className="time">{data.date}</Text>
              <Text className="text">{data.text}</Text>
              {data.link && (
                <Text
                  className="link"
                  onClick={() => Taro.navigateTo({ url: data.link.url })}
                >
                  {data.link.text}
                </Text>
              )}
              <View className="circle" />
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default TimelineComponent;
