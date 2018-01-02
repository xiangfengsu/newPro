import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './AdvancedProfile.less';

import LightBox from '../../components/LightBox/Index';
const { Description } = DescriptionList;



const extra = (
    <Row>
        <Col xs={24} sm={12}>
            <div className={styles.textSecondary}>状态</div>
            <div className={styles.heading}>待审批</div>
        </Col>
        <Col xs={24} sm={12}>
            <div className={styles.textSecondary}>订单金额</div>
            <div className={styles.heading}>¥ 568.08</div>
        </Col>
    </Row>
);

const description = (
    <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="创建人">曲丽丽</Description>
        <Description term="订购产品">XX 服务</Description>
        <Description term="创建时间">2017-07-07</Description>
        <Description term="关联单据"><a href="">12421</a></Description>
        <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
        <Description term="备注">请于两个工作日内确认</Description>
    </DescriptionList>
);

const tabList = [{
    key: 'user',
    tab: '客户信息',
}, {
    key: 'evaluate',
    tab: '估价信息',
}, {
    key: 'contract',
    tab: '合同信息',
}];

@connect(state => ({
    profile: state.profile,
}))
export default class AdvancedProfile extends Component {
    state = {

    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'profile/fetchAdvanced',
        });
    }
    onTabChange = (key) => {
        logs('key', key);
    }
    render() {
        return (
            <PageHeaderLayout
                title="单号：234231029431"
                logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
                // action={action}
                content={description}
                extraContent={extra}
                tabList={tabList}
                onTabChange={(key) => { this.onTabChange(key) }}
            >
                <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
                    <DescriptionList style={{ marginBottom: 24 }}>
                        <Description term="用户姓名">付小小</Description>
                        <Description term="会员卡号">32943898021309809423</Description>
                        <Description term="身份证">3321944288191034921</Description>
                        <Description term="联系方式">18112345678</Description>
                        <Description term="联系地址">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</Description>
                    </DescriptionList>
                </Card>
                <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
                    <DescriptionList style={{ marginBottom: 24 }}>
                        <Description term="用户姓名">付小小</Description>
                        <Description term="会员卡号">32943898021309809423</Description>
                        <Description term="身份证">3321944288191034921</Description>
                        <Description term="联系方式">18112345678</Description>
                        <Description term="联系地址">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</Description>
                    </DescriptionList>
                </Card>
                <Card title="图片信息" style={{ marginBottom: 24 }} bordered={false}>
                    <LightBox />
                </Card>
            </PageHeaderLayout>
        );
    }
}