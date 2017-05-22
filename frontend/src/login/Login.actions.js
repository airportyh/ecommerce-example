import $ from 'jquery';
import { hashHistory } from 'react-router';

export function login(username, password) {
  let asyncAction = (dispatch) => {
    $.ajax({
      url: 'http://localhost:4000/api/user/login',
      method: 'POST',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json'
    })
    .then(data => {
      dispatch({
        type: 'login-success',
        data: data
      });
      hashHistory.push('/');
    })
    .catch(resp => {
      dispatch({
        type: 'login-error'
      });
    })
  };
  return asyncAction;
}
