import React, { Component } from 'react';
import { View } from '@tarojs/components';
import PropTypes from 'prop-types';
import './FamilyTree.scss';

class TreeChartItem extends Component {


  // 添加属性类型检查
  static propTypes = {
    // 数据源
    dataSource: PropTypes.object.isRequired,
    // 是否是根节点
    isRoot: PropTypes.bool,
    // 子节点key值
    childrenKey: PropTypes.string,
    // 点击事件
    onItemClick: PropTypes.func,
    // 渲染内容
    renderItem: PropTypes.func,
    // 自定义横线样式（待舍弃）
    horizontalLineClass: PropTypes.string,
    // 自定义竖线样式（带舍弃）
    verticalLineClass: PropTypes.string,
    // 元素左右边距
    itemMargin: PropTypes.string,
    // 全局背景色
    bgColor: PropTypes.string,
    // 全局背景图
    bgImage: PropTypes.string,
    // 水平线颜色
    horizontalLineColor: PropTypes.string,
    // 竖线颜色
    verticalLineColor: PropTypes.string,
    // 水平线宽度（默认50%, 且不可修改）
    horizontalLineWidth: PropTypes.string,
    // 竖线宽度
    verticalLineWidth: PropTypes.string,
    // 水平线高度
    horizontalLineHeight: PropTypes.string,
    // 竖线高度
    verticalLineHeight: PropTypes.string,
  };

  // 设置属性默认值
  static defaultProps = {
    isRoot: true,
    childrenKey: 'children',
    onItemClick: (item) => {
      console.log('点击了:', item);
    },
    renderItem: (dataSource) => {
      return (
        <View className="user-name">
          <View className="user-name-text">{dataSource.username}</View>
        </View>
      );
    },
    horizontalLineClass: 'horizontal-line',
    verticalLineClass: 'vertical-line',
    itemMargin: '150rpx',
    horizontalLineColor: '#000',
    verticalLineColor: '#000',
    horizontalLineWidth: '50%',
    verticalLineWidth: '5rpx',
    horizontalLineHeight: '5rpx',
    verticalLineHeight: '50rpx',
  };




  constructor(props) {
    super(props);
    this.state = {
      bStyle: {
        backgroundColor: props.verticalLineColor,
        width: props.verticalLineWidth,
        height: props.verticalLineHeight,
      },
      cStyle: {
        backgroundColor: props.horizontalLineColor,
        width: props.horizontalLineWidth,
        height: props.horizontalLineHeight,
      }
    };
  }
  handleItemClick(item) {
    this.props.onItemClick(item);
  }

  // 渲染子节点
  renderChildren(children) {
    const { childrenKey } = this.props;
    const { cStyle } = this.state;


    return children.map((item, index) => (
      <View className="children-super" key={index}>
        {index === 0 ? (
          <View
            // 如果孩子大于1，就添加一个class，否则不添加
            className={children.length > 1 ? 'left-top-radius first-line' : 'left-top-radius'}
            style={children.length === 1 ? { ...cStyle, height: '0 !important' } : cStyle}
          ></View>
        ) : index === children.length - 1 ? (
          <View className={'right-top-radius last-line'} style={cStyle}></View>
        ) : (
          <View style={{ ...cStyle, width: '100% !important' }}></View>
        )}
        <TreeChartItem
          key={index}
          dataSource={item}
          isRoot={false}
          childrenKey={childrenKey}
          onItemClick={this.handleItemClick.bind(this)}
          renderItem={this.props.renderItem}
          itemMargin={this.props.itemMargin}
          horizontalLineColor="#E7C48D"
          verticalLineColor="#E7C48D"
        />
      </View >
    ));
  }

  render() {
    const { dataSource, isRoot, childrenKey, itemMargin, bgColor } = this.props;

    const { bStyle } = this.state;

    return (
      <View className="tree-container" style={{ backgroundColor: bgColor }}>
        <View className="user-super-container">
          <View className="user-sons-container" style={{ paddingLeft: itemMargin, paddingRight: itemMargin }}>
            <View className="user-container">
              {isRoot ? null : <View style={bStyle}></View>}
              <View className="user-info" onClick={() => this.handleItemClick(dataSource)}>
                {/* 渲染内容 */}
                {this.props.renderItem(dataSource)}
              </View>
              {dataSource[childrenKey] && dataSource[childrenKey].length > 1 ? <View style={bStyle}>
              </View> : null}
            </View>
          </View>
        </View>
        {
          dataSource[childrenKey] ? (
            <View className="children-container">
              {this.renderChildren(dataSource[childrenKey])}
            </View>
          ) : null
        }
      </View >
    );
  }
}

export default TreeChartItem;
