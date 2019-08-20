import React, { Component } from 'react';
import {
  Upload,
  message,
  Icon
} from 'antd';

import styles from './App.less';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  // 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。（支持返回Promise对象）
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  // 上传文件改变时的状态 上传中、完成、失败都会调用这个函数
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl =>
      //   this.setState({
      //     imageUrl,
      //     loading: false,
      //   }),
      // );
    }
  };
  
  render() {
    return (
      <Upload 
        listType="picture-card"
        className={styles.avatarUploader}
        action=""
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        <Icon type="plus" />
      </Upload>
    );
  }
}