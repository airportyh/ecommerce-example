import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './ProductList.actions';

class ProductList extends React.Component {
  componentDidMount() {
    this.props.getProductList();
  }
  render() {
    return (
      <div>
        <h1>Product List</h1>
        <div className="product-list">
          {
            this.props.products.map(prod =>
              <img
                key={prod.id}
                src={'./images/'  + prod.image_path}
                alt={prod.name} width="300"/>
            )
          }
        </div>
      </div>
    );
  }
}

const ProductListContainer = ReactRedux.connect(
  state => state.productList,
  actions
)(ProductList);

export default ProductListContainer;
