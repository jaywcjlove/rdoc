import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.less';

const Footer = () => {
  return (
    <div className={styles.noMatch}>
      页面不存在
      <Link to="/">返回首页</Link>
    </div>
  );
};

export default Footer;
