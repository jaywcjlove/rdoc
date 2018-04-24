import React from 'react';
import styles from './index.less';

const version = VERSION; // eslint-disable-line

const Footer = () => {
  return (
    <div className={styles.footer}>
      Copyright © 2018 Powered by <a target="_blank" rel="noopener noreferrer" href="https://github.com/jaywcjlove/rdoc">RDoc {version}</a>.
    </div>
  );
};

export default Footer;
