import { Component, createRef } from 'react'
import { View, Button } from '@tarojs/components'

import "taro-ui/dist/style/components/flex.scss";
import './index.scss'
import "taro-ui/dist/style/components/action-sheet.scss";

import Taro from '@tarojs/taro';
import { getUserListByRank } from '../../family_tree/api';
import { getStorageValue, iShowToast, pageBack } from '../../../until/util';

import 'form-taro3-react/dist/styles/index.scss'

import {
  CustomizeForm,
  FormPicker,
  FormRadioGroup,
  FormTextArea,
  FormTextInput
} from 'form-taro3-react';
import { checkAuthRealName, queryAllAYearByAuth, submitAuthData } from '../api';
import Result from '../../../components/result';

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show_reg: false,
      token: Taro.getStorageSync('token'),
      user: Taro.getStorageSync('user'),
      authorize: false,
      id_card: '',
      lifeSelectData: '',
      lifeSelectDataChecked: {},
      currentRanksData: '',
      currentRanksDataChecked: {},
      desc: '',
    }
    this.formRef = createRef()
  }

  componentDidMount() {
    // const has_reg = this.checkUserAuth();
    checkAuthRealName().then(res => {
      if (res.data != true) {
        // 没有注册，展示注册窗体
        this.setState({ show_reg: res.data.data })
        // 调用接口
        queryAllAYearByAuth().then(res => {
          let allNumer = Array();
          // 倒序输出
          let ranksData = res.data.reverse();
          ranksData.map((item, index) => {
            allNumer.push({
              key: ranksData.length - index,
              value: item,
            })
          })
          // 选择器所用到的数据
          this.setState({
            // 选择器显示的
            lifeSelectData: allNumer
          })
        })
      } else {
        this.setState({ show_reg: true })
      }
    }).catch(err => {
      this.setState({ show_reg: false })
    })

  }

  liftSelectDataChange = key => {
    let _key = this.state.lifeSelectData[key]['key']
    let _value = this.state.lifeSelectData[key]['value']
    let _new = {
      key: _key,
      value: _value
    }
    this.setState({
      lifeSelectDataChecked: _new
    }, () => {
      this.getUserByCurrentRankChecked();
    })
  }


  getUserByCurrentRankChecked = () => {
    // 组装数据
    let currentRanks = this.state.lifeSelectDataChecked.key
    getUserListByRank(currentRanks).then(res => {
      if (res.data == null) {
        iShowToast(res.msg, 'error');
        return false;
      }
      let allUser = Array();
      res.data.map(item => {
        let _item = {
          key: item.id,
          value: item.name
        }
        allUser.push(_item)
      })
      // 默认值
      this.setState({
        currentRanksData: allUser,
        currentRanksDataChecked: {
          key: allUser[0]['key'],
          value: allUser[0]['value']
        }
      })
    })
  }
  userChange = (key) => {
    let _key = this.state.currentRanksData[key]['key']
    let _value = this.state.currentRanksData[key]['value']
    let _new = {
      key: _key,
      value: _value
    }
    console.log(_new)
    this.setState({
      currentRanksDataChecked: _new
    })
  }

  submitData = () => {
    const { currentRanksDataChecked, lifeSelectDataChecked, id_card } = this.state
    const idcardReg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
    if (id_card.length == 0 || idcardReg.test(id_card) === false) {
      iShowToast('身份证格式错误', 'error')
      return false;
    }
    let data = {
      rank: lifeSelectDataChecked.key,
      u_id: currentRanksDataChecked.key,
      id_card: id_card
    }
    console.log(data)
  }


  validate() {
    this.formRef.current?.validate().then((res) => {
      // 校验通过
      let data = this.formRef.current.getFieldsValue()
      let ranks = this.state.lifeSelectData[data.ranks]['key']
      let user_id = this.state.currentRanksData[data.name]['key']
      data.ranks = ranks;
      data.user_id = user_id

      submitAuthData(data).then(res => {
        iShowToast(res.msg)
        setTimeout(() => {
          pageBack()
        }, 1500)
      }).catch(err => {
        iShowToast(err, 'error')
      })
    }).catch((error) => {
      iShowToast(error)
    });
  }
  render() {
    const bg_url = getStorageValue('bg_url')
    return (
      <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
        {
          this.state.show_reg != true ? (
            <View className='content'>
              <CustomizeForm
                ref={this.formRef}
                defaultValue={{
                  gender: "1",
                  spouse: '',
                  desc: ''
                }}
                onValueChange={(diff) => {
                }}
              >
                <FormPicker
                  label='世系列表'
                  fieldProps={{
                    name: 'ranks',
                    mode: 'selector',
                    range: this.state.lifeSelectData,
                    rangeKey: 'value'
                  }}
                  rules={{ required: true, message: '请选择世系' }}
                  onPickerChange={e => this.liftSelectDataChange(e)}
                />

                <FormPicker
                  label='人员列表'
                  fieldProps={{
                    name: 'name',
                    mode: 'selector',
                    range: this.state.currentRanksData,
                    rangeKey: 'value'
                  }}
                  rules={{ required: true, message: '请选择自己' }}
                // onChange={this.liftSelectDataChange}
                />
                <FormTextInput
                  label='身份证号'
                  fieldProps={{
                    name: 'id_card',
                    placeholder: '请输入身份证号'
                  }}
                  rules={{ required: true, message: '身份证号不能为空' }}
                />
                <FormTextInput
                  label='籍贯'
                  fieldProps={{
                    name: 'birthplace',
                    placeholder: '请输入籍贯'
                  }}
                  rules={{ required: true, message: '籍贯不能为空' }}
                />
                <FormRadioGroup
                  label='性别'
                  fieldProps={{
                    name: 'gender',
                  }}
                  options={[
                    { label: '男', option: { value: '1' } },
                    { label: '女', option: { value: '2' } }
                  ]}
                  rules={{ required: true, message: '请选择' }}
                />
                <FormTextInput
                  label='配偶'
                  fieldProps={{
                    name: 'spouse',
                    placeholder: '请输入配偶名字'
                  }}
                />
                <FormTextArea
                  label='简介'
                  fieldProps={{ name: 'desc' }}
                  maxLength={200}
                />

                <Button onClick={this.validate.bind(this)} className='to_submit'>提交</Button>
              </CustomizeForm>
            </View>
          ) : (
            <View className='content'>
              <Result type={2} content="您的档案信息已完善" />
            </View>
          )
        }
      </View>
    )
  }
}
