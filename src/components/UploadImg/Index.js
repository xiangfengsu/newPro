import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Upload, Icon, Modal } from 'antd';
export default class UploadImg extends Component {

    constructor(props) {
        super(props);
        const value = this.props.value || {};
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: value.fileList || []
        };
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => {
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
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        // 192.168.3.16:8080/ChunLvXiaoDai/pictures/save
        //jsonplaceholder.typicode.com/posts/
        return (
            <div className="clearfix">
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}