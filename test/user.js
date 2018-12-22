/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
// require dev-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { should as _should, use } from 'chai';

import chaiHttp from 'chai-http';

import supertest from 'supertest';

import server from '../server/server';

// import db from '../server/controller/index';

const should = _should();

use(chaiHttp);

describe('api/v1/users', () => {
  // before((done) => {
  //   const text = 'DELETE FROM users WHERE id != af0c6db5-c95f-4275-b63d-33d6346ce342';
  //   db.query(text, []);
  //   done();
  // });

  // testing the GET users router
  describe('/GET users', () => {
    it('should GET all users', (done) => {
      supertest(server)
        .get('/api/v1/users/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
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
      supertest(server)
        .post('/api/v1/users/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409); // user already exists in db
          res.body.should.be.a('object');
          res.body.should.have.property('error');
        });
      done();
    });

    // testing the login route
    it('should login user with token', (done) => {
      const user = {
        email: 'jenniferolibie@gmail.com',
        password: 'testing12345',
      };
      supertest(server)
        .post('/api/v1/users/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          if (res.body.error) res.body.should.have.property('error');
          else {
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('token');
            res.body.data[0].should.have.property('user');
          }
        });
      done();
    });
  });

  describe('/GET parcels', () => {
    it('should get parcels by user', (done) => {
      supertest(server)
        .get('/api/v1/users/af0c6db5-c95f-4275-b63d-33d6346ce342/parcels?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });
  });
});
