import $ from 'jquery';

export function getProductList() {
  let asyncAction = function(dispatch) {
    $.get('http://localhost:4000/api/products')
      .then(data => {
        dispatch({
          type: 'product-list',
          data: data
        });
      })
      .catch(resp => {
        let error = (resp.responseJSON && resp.responseJSON.message) || resp.responseText;
        dispatch({
          type: 'product-list-error',
          error: error
        });
      });
  };
  return asyncAction;
}
