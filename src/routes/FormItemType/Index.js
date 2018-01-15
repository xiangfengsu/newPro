import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Card, Button, Input, Tabs } from 'antd';

import { renderFormItem } from '../../common/formItem';
import styles from './Index.less';

import { FormItems } from './pageConfig';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  }
};
@Form.create()
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
  }
  renderFormItem = () => {
    const { dispatch, form } = this.props;
    return FormItems.map((item, i) => {
      const InputType = renderFormItem(item, form);
      return (
        <Col lg={item.colSpan || 8} md={12} sm={24} key={`${item.key}_${i}`} >
          <FormItem
            label={`${item.label}`}
            hasFeedback
          >
            {InputType}
          </FormItem>
        </Col>
      );
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values ', values);
      }
    });
  }
  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }
  render() {
    return (
      <Card bordered={false} loading={false}>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            {this.renderFormItem()}
          </Row>
          <Row>
            <Col key="button">
              <FormItem
              >
                <Button type="primary" htmlType="submit">提交</Button>
                <Button htmlType="reset" style={{ marginLeft: 24 }} onClick={this.handleReset}>重置</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }



}