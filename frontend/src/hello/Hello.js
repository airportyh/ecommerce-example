import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Hello.actions';

class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}

const HelloContainer = ReactRedux.connect(
  state => state.hello,
  actions
)(Hello);

export default HelloContainer;
