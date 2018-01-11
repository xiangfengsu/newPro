import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Button, Input, Steps, Icon, Popover, Badge } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

import FooterToolbar from '../../components/FooterToolbar'

import styles from './AdvancedProfile.less';



import LightBox from '../../components/LightBox/Index';
const { Description } = DescriptionList;
const { Step } = Steps;
const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>耗时：2小时25分钟</div>
  </div>
);

const action = (
  <div>
    <Row gutter={8}>
      <Col span={10} offset={10}>
        <Input placeholder="请输入评估价格" />
      </Col>
      <Col span={4} >
        <Button type="primary">评估价格</Button>
      </Col>
    </Row>


  </div>
);
const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>待评估</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>车300评估价</div>
      <div className={styles.heading}>¥ 120000</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="评估复核人">曲丽丽</Description>
    <Description term="创建时间">2017-07-07</Description>
    {/* <Description term="车300评估定价">11000</Description> */}
    <Description term="重要信息1">重要信息1</Description>
    <Description term="重要信息2">重要信息1</Description>
  </DescriptionList>
);

const tabList = [{
  key: 'user',
  tab: '估计页面',
}];

const customDot = (dot, { status }) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);
const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <div>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <div>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div><a href="javascript:void(0)">催一下</a></div>
  </div>
);
@connect(state => ({
  profile: state.profile,
}))
export default class AdvancedProfile extends Component {
  state = {
    width: '100%',
  }
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });
    this.resizeFooterToolbar();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }
  onTabChange = (key) => {
    logs('key', key);
  }
  render() {
    return (
      <PageHeaderLayout
        title="订单号：1002"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        // action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
        onTabChange={(key) => { this.onTabChange(key) }}
      >
        {/* <div style={{ marginBottom: 24 }}>
          <Button type="primary">返回列表</Button>
        </div> */}
        <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction='horizontal' progressDot={customDot} current={1}>
            <Step title="创建项目" description={desc1} />
            <Step title="部门初审" description={desc2} />
            <Step title="财务复核" />
            <Step title="完成" />
          </Steps>
        </Card>
        <Card title="评估复核" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }} >
            <Description term="评估复核价格">未评估</Description>
            <Description term="评估复核时间">2018-01-10</Description>
            <Description term="评估复核人">大凤</Description>
          </DescriptionList>
        </Card>
        <Card title="车300评估信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="评估订单号">A823587679149113</Description>
            <Description term="订单上传时间">2016-11-04 10:29:33.0</Description>
            <Description term="订单完成时间">2016-12-01 15:37:40.0</Description>
            <Description term="上传订单用户手机号">18112345678</Description>
            <Description term="车架号">qwqwq112122111111</Description>
            <Description term="车辆评估报告">
              <Row gutter={8}>
                <Col span={12} >
                  <a>在线查看</a>
                </Col>
                <Col span={12} >
                  <a>PDF下载</a>
                </Col>
              </Row>
            </Description>
            <Description term="车型名称">2017 款 保时捷 Panamera Turbo 4.0T</Description>
            <Description term="所在地区">所在地区</Description>
            <Description term="初登日期">2016-11</Description>
            <Description term="行驶里程">1km</Description>
            <Description term="过户次数">1次</Description>
            <Description term="排量">4.0</Description>
            <Description term="涡轮增压">有</Description>
            <Description term="马力">550</Description>
            <Description term="出厂日期">2016-11</Description>
            <Description term="发动机号">weqwwe</Description>
            <Description term="车牌号">沪G8a2ed</Description>
            <Description term="车辆状态">未发现异常</Description>
            <Description term="车辆是否营转非">无</Description>
            <Description term="事故车类型">无</Description>
            <Description term="车身颜色">棕色</Description>
            <Description term="评估定价">14万元</Description>
            <Description term="新车指导价">新车指导价</Description>
            <Description term="现售价格">11万元</Description>
            <Description term="照片备注">照片备注</Description>

          </DescriptionList>
        </Card>
        <Card title="定价图片" style={{ marginBottom: 24 }} bordered={false}>
          <LightBox />
        </Card>
        <FooterToolbar
          extra={<Button type="primary"
            onClick={() => { this.props.history.push("/assessment/assessment-review") }}>返回列表</Button>}
          style={{ width: this.state.width }}
        >
          <div style={{ width: 600 }}>
            <Row gutter={8}>
              <Col span={10} offset={10}>
                <Input placeholder="请输入评估价格" />
              </Col>
              <Col span={4} >
                <Button type="primary">评估价格</Button>
              </Col>
            </Row>
          </div>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}