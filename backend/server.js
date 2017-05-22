const express = require('express');
const Promise = require('bluebird');
const pgp = require('pg-promise')({
  promiseLib: Promise
});
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cors = require('cors');

const db = pgp({
  database: 'ecommerce'
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/products', (req, resp, next) => {
  db.any('select * from product')
    .then(data => resp.json(data))
    .catch(next);
});

app.get('/api/product/:id', (req, resp, next) => {
  let id = req.params.id;
  db.oneOrNone('select * from product where id = $1', id)
    .then(data => {
      if (data) {
        resp.json(data);
      } else {
        resp.status(404);
        resp.json({
          message: "Product not found."
        });
      }
    })
    .catch(next);
});


/*
Request body shape:
{
  username: "lolcat",
  password: "forthelolz",
  email: "lol@cat.com",
  first_name: "lol",
  last_name: "cat"
}
*/
app.post('/api/user/signup', (req, resp, next) => {
  let data = req.body;
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into customer
        values (default, $1, $2, $3, $4, $5)
        returning username, email, first_name, last_name
        `,
        [
          data.username,
          data.email,
          encryptedPassword,
          data.first_name,
          data.last_name
        ]
      )
    )
    .then(data => resp.json(data))
    .catch(next);
});

/*
Request body shape:
{
  username: "lolcat",
  password: "forthelolz",
}
*/
app.post('/api/user/login', (req, resp, next) => {
  let username = req.body.username;
  let password = req.body.password;
  db.one(
    'select * from customer where username = $1',
    username)
    .then(customer =>
      [customer,
        bcrypt.compare(password, customer.password)])
    .spread((customer, matches) => {
      if (matches) {
        let token = uuid.v4();
        return [
          customer,
          db.one(
            `insert into login_session values
            ($1, default, $2) returning *`,
            [token, customer.id]
          )
        ];
      } else {
        throw new Error('Login failed.');
      }
    })
    .spread((customer, loginSession) => {
      resp.json({
        username: customer.username,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        auth_token: loginSession.token
      });
    })
    .catch(next);
});

function respondUnauthorized(resp) {
  resp.status(403);
  resp.json({
    message: 'Unauthorized'
  });
}

app.use(function authorization(req, resp, next) {
  let token = req.body.token;
  if (!token) {
    respondUnauthorized(resp);
    return;
  }
  db.oneOrNone(`select * from login_session where token = $1`, token)
    .then(loginSession => {
      if (!loginSession) {
        respondUnauthorized(resp);
        return;
      }
      req.loginSession = loginSession;
      next();
    })
    .catch(next);
});

app.post('/api/shopping_cart', (req, resp, next) => {
  let productId = req.body.product_id;
  let customerId = req.loginSession.customer_id;
  db.one(`
    insert into product_in_shopping_cart values
    (default, $1, $2) returning *
    `, [productId, customerId])
    .then(data => resp.json(data))
    .catch(next);
});

app.use((err, req, resp, next) => {
  resp.status(500);
  resp.json({
    message: err.message,
    stack: err.stack.split('\n')
  });
});

app.listen(4000, () => console.log('Listening on 4000.'));
