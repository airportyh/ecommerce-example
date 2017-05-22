const INITIAL_STATE = {
  product: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'product-detail') {
    return Object.assign({}, state, {
      product: action.payload
    });
  }
  return state;
};
