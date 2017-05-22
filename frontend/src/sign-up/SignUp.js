import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './SignUp.actions';

class SignUp extends React.Component {
  submit(event) {
    event.preventDefault();
    this.props.signUp(this.props.username,
      this.props.password);
  }
  render() {
    let passwordsMatch = this.props.password ===
      this.props.confirmPassword;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={event => this.submit(event)}>
          <div>
            <label>Username</label><br/>
            <input type="text"
              value={this.props.username}
              onChange={event => this.props.change(event, 'username')}/>
          </div>
          <div>
            <label>Password</label><br/>
            <input type="password"
              value={this.props.password}
              onChange={event =>
              this.props.change(event, 'password')}
            />
          </div>
          <div>
            <label>Confirm Password</label><br/>
            <input type="password"
              value={this.props.confirmPassword}
              onChange={event =>
              this.props.change(event, 'confirmPassword')}
            />
          </div>
          <p>{!passwordsMatch ? 'Passwords do not match' : ''}</p>
          <p>{this.props.error}</p>
          <button disabled={!passwordsMatch}>Sign Up</button>
        </form>
      </div>
    );
  }
}

const SignUpContainer = ReactRedux.connect(
  state => state.signUp,
  actions
)(SignUp);

export default SignUpContainer;
