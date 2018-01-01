import React from 'react';

export default class Lazyloads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null,
    };
  }
  componentWillMount() {
    this.load(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }
  async load(props) {
    const Loading = () => {
      if (props.loading) return props.loading;
      return <span>loading...</span>;
    };
    this.setState({
      mod: Loading,
    });
    const page = await props.load();
    this.setState({
      mod: page.default,
    });
  }
  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}
