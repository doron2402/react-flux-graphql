import React from "react";
import API from '../Api';
import LinkStore from '../stores/LinkStore';

let _getAppState = () => {
  return { links: LinkStore.getAll() };
};

export default class Main extends React.Component {
  //Before component mount
  componentWillMount() {
    LinkStore.removeListener('change', this.onChange);
  }

  constructor(props) {
    super(props);

    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }
  //After react component mount
  componentDidMount(){
    API.fetchLinks();
    LinkStore.on('change', this.onChange);
  }

  onChange() {
    console.log('4');
    this.setState(_getAppState());
  }

  render() {
    let content = this.state.links.map(link => {
      return <li key={link._id}>
        <a href={link.url}>{link.title}</a>
      </li>;
    });
    return (
    <div>
      <h3>Links</h3>
      <ul>
        {content}
      </ul>
    </div>
    );
  }
}
