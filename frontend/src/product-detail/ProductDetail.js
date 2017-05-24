import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './ProductDetail.actions';

class ProductDetail extends React.Component {
  componentDidMount() {
    let id = this.props.params.id;
    this.props.getProductDetail(id);
  }
  componentWillReceiveProps(newProps) {
    if (this.props.params.id !== newProps.params.id) {
      let id = newProps.params.id;
      this.props.getProductDetail(id);
    }
  }
  render() {
    let product = this.props.product;
    if (!product) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img src={'./images/' + product.image_path} alt={product.name}
        width="300"/>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button onClick={() => this.props.addToCart(
          product.id,
          this.props.auth_token)}>
          Add to Cart
        </button>
        {
          this.props.addedToCart ?
          <label>Added to cart!</label> :
          null
        }
      </div>
    );
  }
}

const ProductDetailContainer = ReactRedux.connect(
  state => Object.assign({},
    state.productDetail,
    {auth_token: state.login.loginInfo && state.login.loginInfo.auth_token}
  ),
  actions
)(ProductDetail);

export default ProductDetailContainer;
