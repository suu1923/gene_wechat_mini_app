import React, { Component, createRef } from 'react';
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'

import 'form-taro3-react/dist/styles/index.scss'
import "taro-ui/dist/style/components/icon.scss";
import { CustomizeForm, FormTextInput } from 'form-taro3-react';
import { AtImagePicker } from 'taro-ui'
import "taro-ui/dist/style/components/image-picker.scss";
import { getStorageValue, iShowToast, uploadFile } from '../../../until/util';
import { submitAuthData } from '../api';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            showAddBtn: true,
            upload_files: []
        }
    }

    formRef = createRef()

    onChange(files) {
        files.map((item, key) => {
            // 开始上传
            if (item.upload != true) {
                uploadFile(item.file.path).then((res) => {
                    const data = JSON.parse(res.data)
                    if (data.code == 1) {
                        this.state.upload_files.push(data.data.url)
                        item.upload = true
                        this.setState({
                            files
                        })
                    }
                })
            }
        })
    }

    onImageClick(index, file) {
        console.log(index, file)
    }

    submitData() {
        const { upload_files } = this.state
        // 判断有没有上传文件
        if (upload_files.length == 0) {
            iShowToast('请上传营业执照', 'none')
            return false;
        }
        this.formRef.current.validate().then(() => {
            let data = this.formRef.current.getFieldsValue()

            // 固定，企业
            data.type = 1
            data.company_license = upload_files.join(',')

            submitAuthData(data).then(res => {
                iShowToast('上传成功');

                setTimeout(function () {
                    pageBack()
                }, 1000)
            }).catch(err => {
                iShowToast('网络请求错误', 'error')
            })
        }).catch(err => {
            console.log('表单数据异常')
        })
    }

    render() {
        const { showAddBtn } = this.state
        const bg_url = getStorageValue('bg_url')
        return (
            <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                <View className='content'>

                    <CustomizeForm
                        ref={this.formRef}
                        // 默认值
                        defaultValue={
                            {
                                company_province: '',
                                company_city: '',
                                company_desc: '',
                                company_info: ''
                            }
                        }
                    >
                        <View>
                            <View>
                                营业执照
                            </View>
                            <AtImagePicker
                                files={this.state.files}
                                onChange={this.onChange.bind(this)}
                                onImageClick={this.onImageClick.bind(this)}
                                mode='scaleToFill'
                                showAddBtn={showAddBtn}
                                className='upload_image'
                            />
                        </View>
                        <FormTextInput
                            label='企业名称'
                            fieldProps={{
                                name: 'company_name',
                                placeholder: '填写证件上一致的名称'
                            }}
                            rules={{ required: true, message: '请填写企业名称' }}
                        />
                        <FormTextInput
                            label='统一信用代码'
                            fieldProps={{
                                name: 'company_credit_code',
                                placeholder: '填写统一信用代码'
                            }}
                            rules={{ required: true, message: '请填写统一信用代码' }}
                        />
                        <FormTextInput
                            label='法定代表人'
                            fieldProps={{
                                name: 'company_people',
                                placeholder: '填写法定代表人'
                            }}
                            rules={{ required: true, message: '请填写法定代表人' }}
                        />
                        <FormTextInput
                            label='证件上所在省份'
                            fieldProps={{
                                name: 'company_province',
                                placeholder: '填写证件上所在省份'
                            }}
                        />
                        <FormTextInput
                            label='证件上所在城市'
                            fieldProps={{
                                name: 'company_city',
                                placeholder: '填写证件上所在城市'
                            }}
                        />
                        <FormTextInput
                            label='简介'
                            fieldProps={{
                                name: 'company_desc',
                                placeholder: '填写简介'
                            }}
                        />
                    </CustomizeForm>
                    <AtButton onClick={this.submitData.bind(this)} className='to_submit'>提交审核</AtButton>
                </View>
            </View>
        )
    }
}