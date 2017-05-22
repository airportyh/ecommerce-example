const INITIAL_STATE = {
  loginInfo: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'login-success') {
    return Object.assign({}, state, {
      loginInfo: action.data
    });
  }
  if (action.type === 'logout') {
    return Object.assign({}, state, {
      loginInfo: null
    });
  }
  return state;
}
