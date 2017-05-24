import $ from 'jquery';

export function getProductDetail(id) {
  let asyncAction = function(dispatch) {
    $.get('http://localhost:4000/api/product/' + id)
      .then(data => {
        dispatch({
          type: 'product-detail',
          payload: data
        });
      })
      .catch(resp => {
        let error = (resp.responseJSON &&
          resp.responseJSON.message) ||
          resp.responseText;
        dispatch({
          type: 'product-detail-error',
          error: error
        });
      });
  };
  return asyncAction;
}

export function addToCart(productId, token) {
  return (dispatch) => {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:4000/api/shopping_cart',
      data: JSON.stringify({
        token: token,
        product_id: productId
      }),
      contentType: 'application/json'
    })
    .then(data => {
      dispatch({
        type: 'add-to-cart-success',
        data: data
      });
    })
    .catch(resp => {
      let error = resp.responseJSON && resp.responseJSON.message || 'Did not work';
      dispatch({
        type: 'add-to-cart-error',
        error: error
      });
    })
  };
}
