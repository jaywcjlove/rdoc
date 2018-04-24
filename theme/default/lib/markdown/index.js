import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import styles from './style/index.less';

hljs.configure({
  tabReplace: '  ', // 2 spaces
  classPrefix: '', // don't append class prefix
});

const formatPath = path =>
  path.replace(/^(\/|\\)/, '')
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .split('/')
    .join('___');

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownStr: 'loading ... ',
    };
  }
  componentWillMount() {
    this.renderMarkdown();
  }
  renderMarkdown() {
    const { page: { type, relative, props } } = this.props;
    const relativeMd = relative || props.relative;
    if (!relativeMd) return null;
    let filename = formatPath(relativeMd);
    if (type === 'directory') {
      filename = formatPath(relativeMd);
    }
    import(`__project_root__/.cache/md/${filename}.md`).then((data) => {
      this.setState({
        markdownStr: data.default || data,
      }, () => {
        let code = ReactDOM.findDOMNode(this);
        code = code.getElementsByTagName('code');
        for (let i = 0; i < code.length; i += 1) {
          if (code[i].parentNode && code[i].parentNode.tagName === 'PRE') {
            hljs.highlightBlock(code[i]);
          }
        }
      });
    });
  }
  render() {
    const { page } = this.props;
    const { title, layout } = page.mdconf;
    return (
      <div className={styles.markdownWapper}>
        {title && layout !== 'IndexLayout' && <h1 id={title} className={styles.pageTitle}>{title}</h1>}
        <ReactMarkdown
          className={classNames('markdown', styles.markdown)}
          source={this.state.markdownStr}
          escapeHtml={false}
          allowNode={(node) => {
            if (node.type === 'html') {
              if (/<!--([^]+?)-->/.test(node.value)) return false;
              // const scriptValue = node.value.match(/<script.*?>(.*?)<\/script>/ig);
              // node.value.replace(/<script.*?>(.*?)<\/script>/, (te) => {
              //   console.log('te:', te);
              // });
            }
            return node;
          }}
        />
      </div>
    );
  }
}
