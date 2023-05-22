import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'


import './index.scss';

export default class Index extends Component {
  state = {
    nodes: [], // 节点数据
  };

  componentDidMount() {
    // 模拟接口请求获取节点数据
    this.fetchNodes();
  }

  fetchNodes = () => {
    // 假设从接口获取节点数据
    const nodesData = [
      { id: 1, name: 'Node 1' },
      { id: 2, name: 'Node 2' },
      { id: 3, name: 'Node 3' },
      // 添加更多节点数据
    ];

    this.setState({ nodes: nodesData });
  };

  render() {
    const { nodes } = this.state;

    return (
      // 构建一个树，第一个节点在最上面，其余的左右排列
      <View className="tree">
        <View className="line"></View>
        <View className="nodes">
          {nodes.map((node, index) => (
            <View className="node" key={node.id}>
              <View className="content">{node.name}</View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
