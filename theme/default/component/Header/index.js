import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './index.less';

const isString = val => typeof val === 'string';

export default class Header extends PureComponent {
  renderTopMenu(menuSource, pathname) {
    if (menuSource.length > 1) {
      menuSource = menuSource.sort((a, b) => {
        if (a.sort < b.sort) return -1;
        if (a.sort > b.sort) return 1;
        return 0;
      });
    }
    return menuSource.map((item, index) => {
      if (!item) return null;
      if (item.mdconf && item.mdconf.visible === true) return null;
      const regx = new RegExp(`^/${item.name}`, 'g');
      const isActive = regx.test(pathname);
      return (
        <Link
          key={index}
          to={`/${item.name}`}
          className={classNames({
            active: isActive,
          })}
          replace={`/${item.name}` === pathname}
        >
          {item.mdconf.title || item.name}
        </Link>
      );
    });
  }
  render() {
    const { location: { pathname }, menuSource, className, children, logo } = this.props;
    return (
      <div className={classNames('header', styles.header, className)}>
        {logo && <Link to="/" replace> <div className={styles.logo}>{logo}</div> </Link>}
        {menuSource && <div className={styles.menu}>{this.renderTopMenu(menuSource, pathname)}</div>}
        {children && children.map((item, index) => {
          if (isString(item)) return item;
          return React.cloneElement(item, {
            key: index,
          });
        })}
      </div>
    );
  }
}

Header.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  menu: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Header.defaultProps = {
  logo: null,
  menu: null,
};
