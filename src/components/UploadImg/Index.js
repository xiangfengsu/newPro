import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Upload, Icon, Modal, message } from 'antd';
import CustomCarouser from '../LightBox/Carouser';
export default class UploadImg extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value || {};
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: value.fileList || [],
      carouserImages: [],
      carouserFirstIndex: 0
    };
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    logs('currFile', file);
    if (file.status !== 'done') {
      message.error(`该文件上传失败，无法预览`);
      return
    }
    if (!/^image\/(gif|png|jpe?g)$/.test(file.type)) {
      message.error(`该文件不是图片类型，无法预览`);
      return
    }
    const { fileList } = this.state;
    const carouserImages = fileList.filter(file => {
      return file.status === 'done' && /^image\/(gif|png|jpe?g)$/.test(file.type)
    }).map(file => {
      return {
        src: file.url || file.thumbUrl,
        uid: file.uid
      }
    });
    const carouserFirstIndex = carouserImages.findIndex(cfile => {
      return cfile.uid === file.uid
    });
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
      carouserImages,
      carouserFirstIndex: carouserFirstIndex === -1 ? 0 : carouserFirstIndex
    });
  }

  handleChange = ({ file, fileList }) => {
    // logs('@@@@@', fileList, file);
    if (file.flag) return;
    const status = file.status;
    if (status === 'done') {
      message.success(`${file.name} 上传成功！.`);
    } else if (status === 'error') {
      message.error(`${file.name} 上传失败`);
    }
    if (!('value' in this.props)) {
      this.setState({ fileList });
    }
    this.triggerChange({ fileList });
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    logs('changedValue', changedValue);
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, changedValue));
    }
  }
  beforeUpload = (file, fileList) => {
    const { maxFileSize } = this.props;
    const { size } = file;
    const maxSize = maxFileSize * 1024 * 1024;
    if (size > maxSize) {
      message.error(`文件大小不能超过${maxFileSize}M`);
      file.flag = true;
      return false;
    }
    return true;
  }
  onRemove = (file) => {
    Modal.confirm({
      title: '删除',
      content: '确认要删除该文件吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);

          return {
            fileList: newFileList,
          };
        });
        message.success(`删除成功！`);
      }
    });

    return false;
  }
  render() {
    const { previewVisible, previewImage, fileList, carouserImages, carouserFirstIndex } = this.state;
    const { action, maxLength, multiple, acceptType, listType } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={action}
          accept={acceptType}
          multiple={multiple}
          listType={listType}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
        >
          {fileList.length >= maxLength ? null : uploadButton}
        </Upload>
        {
          carouserImages.length > 0 ? (
            <CustomCarouser
              visible={previewVisible}
              images={carouserImages}
              currentIndex={carouserFirstIndex}
              hideCarouser={this.handleCancel}

            />
          ) : null
        }


      </div>
    );
  }
}