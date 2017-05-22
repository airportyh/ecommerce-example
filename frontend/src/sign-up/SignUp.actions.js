import $ from 'jquery';
import { hashHistory } from 'react-router';

export function change(event, propName) {
  return {
    type: 'change',
    propName: propName,
    value: event.target.value
  };
}

export function signUp(username, password) {
  let asyncAction = (dispatch) => {
    $.ajax({
      url: 'http://localhost:4000/api/user/signup',
      method: 'POST',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json'
    })
    .then(() => {
      dispatch({
        type: 'sign-up-success'
      });
      hashHistory.push('/');
    })
    .catch(resp => {
      let error = resp.responseJSON &&
        resp.responseJSON.message || 'Sign up error';
      dispatch({
        type: 'sign-up-error',
        error: error
      });
    });
  };
  return asyncAction;
}
