import Markdown from '../../lib/markdown';

export default class Pages extends Markdown {
  constructor(props) {
    super(props);
    this.state = {};
    this.page = props.page;
  }
}
