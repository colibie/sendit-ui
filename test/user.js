/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
// require dev-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { should as _should, use, request } from 'chai';

import chaiHttp from 'chai-http';

import server from '../server/server';

import db from '../server/controller/index';

const should = _should();

use(chaiHttp);

describe('api/v1/users', () => {
  before((done) => {
    const text = 'DELETE FROM users';
    db.query(text, []);
    done();
  });

  // testing the GET users router
  describe('/GET users', () => {
    it('should GET all users', (done) => {
      request(server)
        .get('/api/v1/users/')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('No existing users');
        });
      done();
    });
  });

  describe('/POST users', () => {
    // testing the signup route
    it('should POST a user with required fields', (done) => {
      const user = {
        firstname: 'chidera',
        lastname: 'richard',
        othernames: '',
        password: 'testing12345',
        email: 'jenniferolibie@gmail.com',
        username: 'chiric',
      };
      request(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('password').lengthOf.above(5);
        });
      done();
    });

    // testing the login route
    it('should login user with token', (done) => {
      const user = {
        username: 'chiric',
        password: 'testing12345'
      };
      request(server)
        .post('/api/v1/users/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
        });
      done();
    });
  });
});
