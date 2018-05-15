import React, { PureComponent } from 'react';
// import classNames from 'classnames';
import styles from './Link.less';

export default class Link extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { title, href, children } = this.props;
    let link = href.replace(/(\/|\/show\/|\/show)$/g, '');

    if (/^(https|http):\/\/(jsfiddle.net|runjs.cn|codepen.io)/.test(link)) {
      const regexRunjs = /(https|http):\/\/runjs.cn\/code\/(.*)/gi;
      const regexCodepen = /(https|http):\/\/codepen.io\/(.*)\/pen\/(.*)/gi;
      const runjs = regexRunjs.exec(link);
      const codepen = regexCodepen.exec(link);
      if (runjs && runjs.length > 2) {
        link = `http://sandbox.runjs.cn/show/${runjs[2]}`;
      } else if (codepen && codepen.length > 3) {
        link = `https://codepen.io/${codepen[2]}/embed/${codepen[3]}?height=400`;
      } else {
        link = `${link}/show/`;
      }
      return (
        <iframe frameBorder={0} allowFullscreen="allowfullscreen" className={styles.frame} src={link} title="This is a unique title" />
      );
    }
    return (
      <a href={href} title={title}>
        {children}
      </a>
    );
  }
}
