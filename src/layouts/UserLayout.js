import React from 'react';
import { Link, Route, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';


class UserLayout extends React.PureComponent {
    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = '瑞博恩债权业务系统';
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - 瑞博恩债权业务系统`;
        }
        return title;
    }
    render() {
        const { routerData, match } = this.props;
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <span className={styles.title}>瑞博恩债权业务系统</span>
                        </div>
                    </div>
                    {
                        getRoutes(match.path, routerData).map(item =>
                            (
                                <Route
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                />
                            )
                        )

                    }
                    {/* <Redirect exact from="/user" to="/user/login" /> */}
                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
