import $ from 'jquery';

export function getShoppingCart(token) {
  console.log('token': token);
  return (dispatch) => {
    $.get('http://localhost:4000/api/shopping_cart', { token: token })
      .then(data => {
        dispatch({
          type: 'shopping-cart',
          data: data
        });
      })
      .catch(resp => {
        let error = resp.responseJSON && resp.responseJSON.message || 'Something went wrong';
        dispatch({
          type: 'shopping-cart-error',
          error: error
        });
      });
  };
}
