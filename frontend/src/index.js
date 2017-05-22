// Stylesheet
import './index.css';

// Standard React/Redux imports
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';

// React Router stuff
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

// import all components and their reducers here
import ProductListContainer from './product-list/ProductList';
import productListReducer from './product-list/ProductList.reducer';
import ProductDetailContainer from './product-detail/ProductDetail.js';
import productDetailReducer from './product-detail/ProductDetail.reducer';
import signUpReducer from './sign-up/SignUp.reducer';
import SignUpContainer from './sign-up/SignUp';
import LoginContainer from './login/Login';
import loginReducer from './login/Login.reducer';

const reducer = Redux.combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  signUp: signUpReducer,
  login: loginReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

class AppLayout extends React.Component {
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  render() {
    let loggedIn = !!this.props.loginInfo;
    return (
      <div>
        <ul className="nav">
          <li><IndexLink to="/" activeClassName="active">All Products</IndexLink></li>
          {!loggedIn ?
            [<li key="signup"><Link to="/signup">Sign Up</Link></li>,
            <li key="login"><Link to="/login">Login</Link></li>] :
            <li>
              Welcome, {this.props.loginInfo.first_name}!
              &nbsp;
              <a href="#" onClick={event => this.logout(event)}>Logout</a>
            </li>
          }
        </ul>
        {this.props.children}
      </div>
    )
  }
}

const AppLayoutContainer = ReactRedux.connect(
  state => ({
    loginInfo: state.login.loginInfo
  }),
  { logout: () => ({ type: 'logout' })}
)(AppLayout);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>
        <IndexRoute component={ProductListContainer}/>
        <Route path="/product/:id"    component={ProductDetailContainer}/>
        <Route path="/signup"
          component={SignUpContainer}/>
        <Route path="/login"
          component={LoginContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
