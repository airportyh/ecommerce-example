const INITIAL_STATE = {
  product: null,
  addedToCart: false
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'product-detail') {
    return Object.assign({}, state, {
      product: action.payload
    });
  } else if (action.type === 'add-to-cart-success') {
    return Object.assign({}, state, {
      addedToCart: true
    });
  }
  return state;
};
