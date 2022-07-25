import React, { Component, createRef } from 'react';
import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import "taro-ui/dist/style/components/icon.scss";

import { AtImagePicker } from 'taro-ui'
import "taro-ui/dist/style/components/image-picker.scss";
import { getStorageValue, iShowToast, pageBack, toPage, uploadFile } from '../../../until/util';
import { submitAuthData } from '../api';

import {
    CustomizeForm,
    FormTextInput
} from 'form-taro3-react';

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
                    console.log(JSON.parse(res.data))
                    const data = JSON.parse(res.data)
                    if (data.code == 1) {
                        // source.push(data.data.fullurl)
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
            iShowToast('至少上传一张证件', 'none')
            return false;
        }

        this.formRef.current.validate().then(() => {
            let data = this.formRef.current.getFieldsValue()
            // 固定，艺术
            data.type = 2
            data.art_images = upload_files.join(',')

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
                                art_desc: '',
                                art_info: ''
                            }
                        }
                    >
                        <FormTextInput
                            label='证书名称'
                            fieldProps={{
                                name: 'art_name',
                                placeholder: '请填写证书名称'
                            }}
                            rules={{ required: true, message: '证书名称不能为空' }}
                        />
                        <FormTextInput
                            label='简介'
                            fieldProps={{
                                name: 'art_desc',
                                placeholder: '填写简介'
                            }}
                        />
                        <br />
                        <br />
                        <br />

                        <View>
                            <View style={{
                                fontSize: "26rpx",
                                height: "36rpx",
                                color: "#333",
                                width: "7em",
                            }}>
                                上传证件
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