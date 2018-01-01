import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Card, Button, Input, Tabs } from 'antd';

import { renderFormItem } from '../../../common/formItem';
import styles from './Index.less';

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
export default class DetailFormInfo extends PureComponent {
    constructor(props) {
        super(props);
    }
    renderFormItem = () => {
        const { formItems, dispatch, form: { getFieldDecorator } } = this.props;
        return formItems.map((item, i) => {
            const InputType = renderFormItem(item, getFieldDecorator, dispatch);
            return (
                <Col lg={item.colSpan || 8} md={12} sm={24} key={`${item.key}_${i}`} >
                    <FormItem
                        label={`${item.label}`}
                    >
                        {InputType}
                    </FormItem>
                </Col>
            );
        });
    }
    render() {
        return (
            <Card bordered={false} loading={false}>
                <Form layout="vertical">
                    <Row gutter={24}>
                        {this.renderFormItem()}
                    </Row>
                </Form>
            </Card>

        );
    }



}