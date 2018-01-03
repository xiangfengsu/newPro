import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';

import styles from './index.less';

import { getCookie, setCookie } from './utils/cookie';
import { encodeHandle, decodeHandle } from './utils/base64';
import { setTimeout } from 'timers';

dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className={styles.globalSpin} />;
});
const AuthRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = getCookie(encodeHandle('name'));
    return (
        <Route {...rest} render={props => (
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: '/user/login',
                        state: { from: props.location }
                    }} />
                )
        )} />
    )
}
function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const UserLayout = routerData['/user'].component;
    const BasicLayout = routerData['/'].component;
    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route path="/user" render={props => <UserLayout {...props} />} />
                    {/* <Route path="/" render={props => <BasicLayout {...props} />} /> */}
                    <AuthRoute path="/" component={BasicLayout} />
                </Switch>
            </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
