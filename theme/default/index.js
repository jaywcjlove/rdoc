import React from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import BasicLayout from './layout/BasicLayout';
import IndexLayout from './layout/IndexLayout';
import NoMatch from './component/NoMatch';
import Loading from './component/Loading';

import './index.less';

// 获取首页路由参数
// Markdown 配置 layout = 'IndexLayout'
const getIndexProps = (menus = [], attr) => {
  menus.forEach((item, index) => {
    if (item && item.mdconf && item.mdconf.layout === 'IndexLayout') {
      attr = item;
    }
    if (!attr && item.children && item.children.length > 0) {
      attr = getIndexProps(item.children, attr);
    }
  });
  return attr;
};

export default function (Lazyload, props) {
  let indexRoute = null;

  // 路由加载Component
  if (props.routeData && props.routeData.length > 0) {
    props.routeData.map((item) => {
      item.component = Lazyload(() => import('./routes/Pages'), item, <Loading />);
      return item;
    });
  }
  // 首页路由
  // 获取自定义路由
  let indexProps = getIndexProps(props.menuSource);
  if (indexProps) {
    props.routeData = props.routeData.filter(item => item.mdconf && item.mdconf.layout !== 'IndexLayout');
  } else {
    // 未定义首页，默认第一个路由当首页
    indexProps = props.routeData.find((item, index) => index === 0);
    indexProps.mdconf.layout = 'IndexLayout';
  }

  const indexItem = {
    path: '/',
    mdconf: { ...indexProps.mdconf, layout: 'IndexLayout' },
    props: { ...indexProps.props },
    article: indexProps.article,
  };

  // 首页路由放置路由数组中生成路由
  props.routeData.unshift({
    ...indexItem,
    component: Lazyload(() => import('./routes/Pages'), indexItem, <Loading />),
  });

  // 获取首页路由
  indexRoute = props.routeData.filter(item => item.mdconf && item.mdconf.layout === 'IndexLayout');

  return (
    <Switch>
      <Route path="/404" render={routeProps => <NoMatch {...routeProps} {...props} />} />
      <Route path="/"
        render={(routeProps) => {
          const { location: { pathname } } = routeProps;
          if (pathname === '/') {
            // 加载首页模板
            return <IndexLayout {...routeProps} {...props} indexRoute={indexRoute} />;
          }
          return <BasicLayout {...routeProps} {...props} />;
        }}
      />
    </Switch>
  );
}
