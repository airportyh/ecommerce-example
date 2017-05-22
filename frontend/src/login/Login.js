import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Login.actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }
  change(event, propName) {
    this.setState({
      [propName]: event.target.value
    });
  }
  submit(event) {
    event.preventDefault();
    this.props.login(
      this.state.username,
      this.state.password
    );
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={event => this.submit(event)}>
          <div>
            <label>Username</label><br/>
            <input type="text"
              value={this.state.username}
              onChange={event => this.change(event, 'username')}
            />
          </div>
          <div>
            <label>Password</label><br/>
            <input type="password"
              value={this.state.password}
              onChange={event =>
                this.change(event, 'password')}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

const LoginContainer = ReactRedux.connect(
  state => state.login,
  actions
)(Login);

export default LoginContainer;
