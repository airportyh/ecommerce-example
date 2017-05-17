const INITIAL_STATE = {
  products: []
};

export default function reducer(
  state = INITIAL_STATE, action) {
  if (action.type === 'product-list') {
    return Object.assign({}, state, {
      products: action.data
    });
  }
  return state;
}
