const INITIAL_DATA = {
  cartItems: []
};

export default function reducer(state = INITIAL_DATA, action) {
  if (action.type === 'shopping-cart') {
    return {
      ...state,
      cartItems: action.data
    };
  }
  return state;
}
