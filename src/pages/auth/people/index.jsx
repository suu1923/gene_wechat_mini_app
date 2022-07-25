import React, { Component } from 'react';
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import "taro-ui/dist/style/components/icon.scss";

import { AtImagePicker } from 'taro-ui'
import "taro-ui/dist/style/components/image-picker.scss";
import { getStorageValue, iShowToast, pageBack, uploadFile } from '../../../until/util';
import { submitAuthData } from '../api';

import { CustomizeForm, FormTextInput } from 'form-taro3-react';
import { createRef } from 'react';

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
            iShowToast('至少上传一张证明材料', 'none')
            return false;
        }

        this.formRef.current.validate().then(() => {
            let data = this.formRef.current.getFieldsValue()
            // 固定，艺术
            data.type = 3
            data.people_images = upload_files.join(',')

            // 提交
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
        const { data, showAddBtn } = this.state
        const bg_url = getStorageValue('bg_url')

        return (
            <View className='container' style={{ backgroundImage: 'url(' + bg_url + ')' }}>
                <View className='content'>
                    <CustomizeForm
                        ref={this.formRef}
                        // 默认值
                        defaultValue={
                            {
                                people_company_province: '',
                                people_company_city: '',
                                people_desc: '',
                                people_info: ''
                            }
                        }
                    >
                        <FormTextInput
                            label='职业'
                            fieldProps={{
                                name: 'people_occupation',
                                placeholder: '请填写职业名称，例如：教师'
                            }}
                            rules={{ required: true, message: '请填写职业名称' }}
                        />
                        <FormTextInput
                            label='在职单位名称'
                            fieldProps={{
                                name: 'people_company_name',
                                placeholder: '请填写在职单位名称'
                            }}
                            rules={{ required: true, message: '请填写在职单位名称' }}
                        />

                        <FormTextInput
                            label='单位所在省份'
                            fieldProps={{
                                name: 'people_company_province',
                                placeholder: '请填写单位所在省份'
                            }}
                        />
                        <FormTextInput
                            label='单位所在城市'
                            fieldProps={{
                                name: 'people_company_city',
                                placeholder: '请填写单位所在城市'
                            }}
                        />
                        <FormTextInput
                            label='职位简介'
                            fieldProps={{
                                name: 'people_desc',
                                placeholder: '请填写职位简介'
                            }}
                        />
                        <View>
                            <View style={{
                                fontSize: "26rpx",
                                height: "36rpx",
                                color: "#333",
                                width: "7em",
                            }}>
                                证明材料
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
                    </CustomizeForm>
                    <AtButton onClick={this.submitData.bind(this)} className='to_submit'>提交审核</AtButton>
                </View>
            </View>
        )
    }
}