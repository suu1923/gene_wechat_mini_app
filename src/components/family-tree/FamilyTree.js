import { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import "./FamilyTree.scss";

class FamilyTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    };
  }

  componentDidMount() {
    this.drawFamilyTree();
  }

  componentDidUpdate() {
    this.drawFamilyTree();
  }

  drawFamilyTree() {
    const { scale, offsetX, offsetY } = this.state;
    const { data } = this.props;
    const canvas = Taro.createCanvasContext("family-tree");
    canvas.clearRect(0, 0, 1000, 1000);
    canvas.scale(scale, scale);
    canvas.translate(offsetX, offsetY);

    // 绘制族谱树逻辑，根据传入的data进行绘制

    canvas.draw();
  }

  handleTouchStart(e) {
    const { pageX, pageY } = e.touches[0];
    this.startX = pageX;
    this.startY = pageY;
  }

  handleTouchMove(e) {
    const { pageX, pageY } = e.touches[0];
    const offsetX = pageX - this.startX;
    const offsetY = pageY - this.startY;

    this.setState((prevState) => ({
      offsetX: prevState.offsetX + offsetX,
      offsetY: prevState.offsetY + offsetY,
    }));

    this.startX = pageX;
    this.startY = pageY;
  }

  handlePinch(e) {
    const { scale } = this.state;
    const diff = e.touches[1].clientY - e.touches[0].clientY;

    this.setState({
      scale: scale + diff * 0.01,
    });
  }

  render() {
    return (
      <View
        className="family-tree"
        onTouchStart={this.handleTouchStart.bind(this)}
        onTouchMove={this.handleTouchMove.bind(this)}
        onPinch={this.handlePinch.bind(this)}
      >
        <Canvas canvasId="family-tree" style="width: 100vw; height: 100vh;" type="2d" />
      </View>
    );
  }
}

export default FamilyTree;
