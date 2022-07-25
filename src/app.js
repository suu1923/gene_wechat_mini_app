import { Component } from 'react'
import './app.scss'
import { globalBg } from './until/util';
import { View } from '@tarojs/components'

class App extends Component {


  componentDidMount() {

  }

  componentWillMount(){
    globalBg();
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  render() {
    // 全局背景图
    return (
      this.props.children
    )
  }
}

export default App
