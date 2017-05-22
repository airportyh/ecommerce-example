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
