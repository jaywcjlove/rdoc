import React, { PureComponent } from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import styles from './indexLayout.less';

export default class IndexLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { location: { pathname }, menuSource, indexRoute, indexProps } = this.props;
    return (
      <div className={styles.wapper}>
        <Header className={styles.header} href="/" indexProps={indexProps} location={this.props.location} menuSource={menuSource} />
        <Switch>
          {indexRoute && indexRoute.map((item) => {
            item.path = '/';
            // 重定向跳转
            if (item && item.mdconf && item.mdconf.redirect) {
              let redirectPath = `${item.path || ''}/${item.mdconf.redirect}`;
              redirectPath = redirectPath.replace(/^\/\//, '/');
              return (
                <Route key={item.path} exact path={item.path} render={() => <Redirect to={redirectPath} />} />
              );
            }
            return (
              <Route key={item.path} exact path={item.path} component={item.component} />
            );
          })}
        </Switch>
        <Footer />
      </div>
    );
  }
}
