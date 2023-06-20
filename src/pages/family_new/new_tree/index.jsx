import { Component } from 'react';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import { View, MovableArea, MovableView, Text } from '@tarojs/components';
import TreeChartItem from '../../../components/family-tree/familyTree.js';
import './index.scss';
import { getFamilyData } from '../api.js';
import { toPage } from '../../../until/util.js';

export default class Index extends Component {
	windowWidth = Taro.getSystemInfoSync().windowWidth;
	windowHeight = Taro.getSystemInfoSync().windowHeight;
	$instance = getCurrentInstance()
	constructor(props) {
		super(props);
		this.state = {
			dataSource: null,
			width: 0,
			height: 0,

			familyTreeData: null
		};
	}
	// 初始化获取数据
	componentWillMount() {
		// 加载字体文件
		Taro.loadFontFace({
			family: 'STKaiti',
			source: 'url("https://php-web-gene.oss-cn-shenzhen.aliyuncs.com/STKaiti.ttf")',
			success: () => {
				console.log('字体加载成功');
			}
		});

		const onReadyEventId = this.$instance.router.onReady
		eventCenter.once(onReadyEventId, () => {
			console.log('onReady')
			this.getFamilyTreeData();

			// onReady 触发后才能获取小程序渲染层的节点
			const { windowWidth, windowHeight } = this;
			setTimeout(() => {
				Taro.createSelectorQuery()
					.select('#rootTree ')
					.boundingClientRect((rect) => {
						console.log('rect', rect);
						this.setState({
							height: rect.height > windowHeight ? rect.height : windowHeight,
						});
					})
					.exec((res) => {
						console.log('res', res);
					});
			}, 1000);
		})
	}

	getFamilyTreeData = async () => {
		const { id } = this.$instance.router.params;
		try {
			const res = await getFamilyData({ group_id: id });
			const { data } = res;
			if (data.length === 0) {
				// 添加提示
				Taro.showToast({
					title: '暂无数据',
					icon: 'error',
					duration: 2000
				});
				return;
			}
			this.setState(
				{
					familyTreeData: data[0],
				},
			);
		} catch (err) {
			console.log('err', err);
		}
	};

	handleItemClick(item) {
		// 处理点击事件
		console.log('Clicked item:', item);
		toPage('../../pinfo/index?id=' + item.id)
	}

	render() {
		const { width, height, familyTreeData } = this.state;
		if (!familyTreeData) {
			return null;
		}
		return (
			<MovableArea className="movable-area">
				<MovableView
					scale
					inertia
					outOfBounds
					direction="all"
					id="rootTree"
					style={{
						width: (width === 0 ? 'auto' : `${width}rpx`),
						height: (height === 0 ? 'auto' : `${height}rpx`)
					}}
					x="100%"
					y={height + 'rpx'}
				>

					<TreeChartItem
						dataSource={familyTreeData}
						onItemClick={this.handleItemClick.bind(this)}
						bgColor="#F7F7F7"
						horizontalLineColor="#E7C48D"
						verticalLineColor="#E7C48D"
						childrenKey="childlist"
						renderItem={item => (
							<View className="custom-user-info">
								<View class="info-spouse-box">
									<Text lines="1" class="info-spouse-text">{item.spouse}</Text>
								</View>
								<View class="info-family-number-box">
									<View class="dot" style={{ backgroundColor: 'rgba(29, 61, 99, 1.000000)' }}></View>
									<Text lines="1" class="info-family-number-text" style={item.gender === 1 ? 'color: rgba(29, 61, 99, 1);' : 'color: rgba(156,0,0,1);'}>长子</Text>
								</View>
								<View class="info-name">
									<View class="dot" style={{ backgroundColor: 'rgba(130, 69, 4, 1.000000)' }}></View>
									<Text lines="1" class="info-name-text">{item.name}</Text>
								</View>
								<View style={{ borderLeft: '2px dashed #824504', marginLeft: '12rpx' }}>
								</View>
								<View class="info-rank-box">
									<View class="info-rank-box-dot"></View>
									<Text lines="1" class="info-rank-text">{item.ranks}</Text>
									<View class="info-gender-box">
										<Text lines="1" class="info-gender-text">{item.gender === 1 ? '男' : '女'}</Text>
									</View>
								</View>
							</View>
						)}
						itemMargin="100rpx"
					/>
				</MovableView>
			</MovableArea>
		);
	}
}