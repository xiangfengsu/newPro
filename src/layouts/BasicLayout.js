import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import { getRoutes, formatter, menuDataPathFormater, menuPathAuthority, routerFormater, menuAuthority } from '../utils/utils';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.svg';

import RenderAuthorized from 'ant-design-pro/lib/Authorized';


const { AuthorizedRoute } = RenderAuthorized('admin');
/**
 * 根据菜单取得重定向地址.
 */



const { Content } = Layout;
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {
    isMobile
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '瑞博恩债权管理系统';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 瑞博恩债权管理系统`;
    }
    return title;
  }
  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  }
  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  }
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  }
  getRedirectData = () => {
    const { currentUser } = this.props;
    const redirectData = [];
    const getRedirect = (item) => {
      if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
          redirectData.push({
            from: `/${item.path}`,
            to: `/${item.children[0].path}`,
          });
          item.children.forEach((children) => {
            getRedirect(children);
          });
        }
      }
    };

    formatter(currentUser['menuData']).forEach(getRedirect);
    return redirectData;

  }
  render() {
    const {
                currentUser, collapsed, fetchingNotices, notices, routerData, match, location
            } = this.props;
    const contentHeight = document.documentElement.clientHeight - 64;
    const menuDatas = formatter(currentUser['menuData']);
    // logs('menuDatas', menuDatas);
    const formaterMenuDatas = menuDataPathFormater(menuDatas);
    // logs(formaterMenuDatas);
    // logs(location);
    // logs(getRoutes(match.path, routerData));
    const layout = (
      <Layout>
        <SiderMenu
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
          menuData={menuDatas}
        />
        <Layout>
          <GlobalHeader
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={this.state.isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
          <Content style={{ padding: '24px 24px 0', height: contentHeight, overflowY: 'auto' }}>
            <div  >
              <Switch>

                {
                  getRoutes(match.path, routerData).map((item, i) => (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={() => menuAuthority(formaterMenuDatas, item.path)}
                      // authority={() => formaterMenuDatas.indexOf(item.path) !== -1 ? true : false}
                      redirectPath='/exception/403'
                    />

                    // <Route
                    //   key={item.key}
                    //   path={item.path}
                    //   component={item.component}
                    //   exact={item.exact}
                    // />
                  ))
                }
                {
                  this.getRedirectData().map(item =>
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  )
                }
                <Redirect exact from="/" to="/dashboard/analysis" />
                <Route render={NotFound} />
              </Switch>
              <GlobalFooter
                copyright={
                  <div>
                    Copyright <Icon type="copyright" /> 2017 瑞博恩债权管理系统
                                 </div>
                }
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  currentUser: state.user.currentUser,
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,

}))(BasicLayout);
