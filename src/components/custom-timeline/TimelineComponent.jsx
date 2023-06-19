import React, { Component } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import PropTypes from 'prop-types';
import './TimelineComponent.scss';

class TimelineComponent extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    position: PropTypes.oneOf(['left', 'right', 'center']),
    color: PropTypes.string,
    width: PropTypes.number,
    dotSize: PropTypes.number,
    firstPosition: PropTypes.oneOf(['left', 'right', 'center']),
    onItemClick: PropTypes.func,
    renderContent: PropTypes.func,
  };


  static defaultProps = {
    data: [],
    direction: 'vertical',
    position: 'center',
    color: '#000',
    width: 2,
    dotSize: 10,
    firstPosition: 'left',
    onItemClick: (item) => {
      console.log('Clicked item:', item);
    },
    renderContent: (section, firstCenter = false, index, callback) => {
      if (!section) {
        return null; // 或者返回一个默认的占位内容
      }
      const { name, year_desc } = section;
      const classNames = firstCenter
        ? 'c-timeline-content first'
        : index % 2 === 1
          ? 'c-timeline-content right'
          : 'c-timeline-content left';
      const handleClick = () => {
        callback(section);
      };
      return (
        <View className={classNames} onClick={handleClick}>
          <Text lines="1" class="paragraph_17">{year_desc}</Text>
          <View class="text-wrapper_10">
            <Text lines="1" class="paragraph_18">{name}</Text>
          </View>
        </View>
      );
    },
  };

  handleItemClick(item) {
    this.props.onItemClick(item);
  }


  renderTimelineBlocks() {
    const { data, renderContent, firstPosition } = this.props;
    // 去掉第一个元素
    data.shift();
    const blocks = data.map((section, index) => {
      const firstCenter = firstPosition === 'center' && index === 0;
      const positionTop = (index === 0) ? '400rpx' : (400 + (index * 200)) + 'rpx';
      const styles = {
        position: 'absolute',
        top: positionTop,
        width: '100%'
      }
      return (
        <View className='cd-timeline-block' key={index} style={styles}>
          {renderContent(section, firstCenter, index, this.handleItemClick.bind(this))}
        </View>
      );
    });
    return blocks;
  }

  render() {
    const { direction, position, color, width, dotSize, data } = this.props;
    const timelineLineStyles = {
      backgroundColor: color,
      width: `${width}rpx`,
      height: data.length * 200 + 'rpx',
      margin: '0 auto'
    };

    const timelineDotStyles = {
      backgroundColor: color,
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      borderRadius: `${dotSize / 2}px`,
    };

    const timelineContainerStyles =
      direction === 'vertical'
        ? { flexDirection: 'column' }
        : { flexDirection: 'row' };

    return (
      <ScrollView className='c-container' scrollY scrollWidth={0}>
        {/* 时间轴位置为center时，提取第一个元素 */}
        {position === 'center' && (
          <View className='cd-timeline-block'>
            {this.props.renderContent(this.props.data[0], true, 0, this.handleItemClick.bind(this))}
          </View>
        )}

        {/* 时间轴内容 */}
        <View className='c-timeline-line' style={timelineLineStyles}></View>
        <View
          className='c-timeline-container'
          style={timelineContainerStyles}
        >
          {this.renderTimelineBlocks()}
        </View>
      </ScrollView>
    );
  }
}

export default TimelineComponent;
