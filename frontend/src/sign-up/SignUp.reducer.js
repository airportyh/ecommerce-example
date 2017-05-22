const INITIAL_STATE = {
  username: '',
  password: '',
  confirmPassword: '',
  error: ''
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'change') {
    return Object.assign({}, state, {
      [action.propName]: action.value
    });
  }
  if (action.type === 'sign-up-error') {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
