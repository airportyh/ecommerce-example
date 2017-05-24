import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './ShoppingCart.actions';

class ShoppingCart extends React.Component {
  componentDidMount() {
    if (this.props.auth_token) {
      this.props.getShoppingCart(this.props.auth_token);
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.auth_token !== newProps.auth_token) {
      this.props.getShoppingCart(newProps.auth_token);
    }
  }
  render() {
    console.log('cart items', this.props.cartItems);
    return (
      <div>
        <h1>Shopping Cart</h1>
        <ul>
          {this.props.cartItems.map(product =>
            <li key={product.item_id}>{product.name} - ${product.price}</li>
          )}
        </ul>
      </div>
    );
  }
}

const ShoppingCartContainer = ReactRedux.connect(
  state => Object.assign({},
    state.shoppingCart, {
    auth_token: state.login.loginInfo
      && state.login.loginInfo.auth_token
  }),
  actions
)(ShoppingCart);

export default ShoppingCartContainer;
