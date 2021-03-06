import React from 'react';
import { Router, Route, Switch, Redirect, routerRedux } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';

import RenderAuthorized from 'ant-design-pro/lib/Authorized';


import styles from './index.less';

import { getCookie, setCookie } from './utils/cookie';
import { encodeHandle, decodeHandle } from './utils/base64';
import { setTimeout } from 'timers';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = RenderAuthorized();

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  const isAuthenticated = getCookie(encodeHandle('name'));
  // logs('isAuthenticated', isAuthenticated);
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <AuthorizedRoute
            path="/user"
            render={props => <UserLayout {...props} />}
            authority={() => !isAuthenticated}
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={() => isAuthenticated}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
