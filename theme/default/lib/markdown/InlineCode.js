import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './InlineCode.less';

export default class Canvas extends PureComponent {
  constructor() {
    super();
    this.state = {
      height: 0,
    };
    this.playerId = `${parseInt(Math.random() * 1e9, 10).toString(36)}`;
  }
  onClick() {
    this.setState({
      height: this.state.height === 0 ? this.codeDom.clientHeight : 0,
    });
  }
  render() {
    const code = this.props.value.replace(/^__dome__/, '').replace(/\\`/g, '`');
    const PreCode = height => (
      <pre className={styles.highlight} style={{ height }}>
        <code ref={node => this.codeDom = node} className={classNames('hljs', { [`language-${this.props.language}`]: this.props.language })}>
          {code}
        </code>
      </pre>
    );
    if (/^__dome__/.test(this.props.value)) {
      return (
        <div className={styles.demo}>
          <div className={styles.demoBody} id={this.playerId}>
            {/^(html|htm)$/.test(this.props.language) && <div dangerouslySetInnerHTML={{ __html: code }} />}
          </div>
          {PreCode(this.state.height)}
          <div className={styles.demoControl} onClick={this.onClick.bind(this)}>
            {this.state.height === 0 ? '显示' : '隐藏'}代码
          </div>
        </div>
      );
    }
    return PreCode();
  }
}
