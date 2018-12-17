/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
// require dev-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { should as _should, use, request } from 'chai';

import chaiHttp from 'chai-http';

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
      request(server)
        .get('/api/v1/users/?isAdmin=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
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
        email: 'jenniferolibie@gmail.com',
        password: 'testing12345',
      };
      request(server)
        .post('/api/v1/users/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          if (res.body.error) res.body.should.have.property('error');
          else {
            res.body.should.have.property('data');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('user');
          }
        });
      done();
    });
  });
});
