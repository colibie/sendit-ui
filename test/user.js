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

// details for populating your database and testing
const userA = {
  username: 'chiric',
  id: 'a4c1a330-8477-4b52-b7cf-ef290a0bbc1f',
  hashedPassword: '833366974ce981351750d22297e9569640a59a68c7f4891e60f1a09683f22772',
  parcel: '',
};

// const userB = {
//   id: 'af0c6db5-c95f-4275-b63d-33d6346ce342',
//   token: '',
//   parcel: '',
// };

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluI'
+ 'jp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo';

describe('api/v1/users', () => {
  // before((done) => {
  //   const text = 'DELETE FROM users WHERE id != af0c6db5-c95f-4275-b63d-33d6346ce342';
  //   db.query(text, []);
  //   done();
  // });

  // testing the GET users router
  describe('/GET users', () => {
    it('should return authentication error', (done) => {
      supertest(server)
        .get(`/api/v1/users/?token=${adminToken}e`)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
        });
      done();
    });

    it('should GET all users', (done) => {
      supertest(server)
        .get(`/api/v1/users/?token=${adminToken}`)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });

    it('should get parcels by user', (done) => {
      supertest(server)
        .get(`/api/v1/users/${userA.id}/parcels?token=${adminToken}`)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });
  });

  describe('/POST users', () => {
    describe('/auth/signup', () => {
      // testing the signup joi validation
      it('should return validation error: signup', (done) => {
        const user = {
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
            res.should.have.status(422); // user already exists in db
            res.body.should.be.a('object');
            res.body.should.have.property('error');
          });
        done();
      });
      // testing the signup route
      it('should return conflict error: username already exists', (done) => {
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
    });

    // testing the login route
    describe('/auth/login', () => {
      it('should login user with token', (done) => {
        const user = {
          email: 'chideraolibie@gmail.com',
          password: 'testing12345',
        };
        supertest(server)
          .post('/api/v1/users/auth/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('token');
            res.body.data[0].should.have.property('user');
          });
        done();
      });

      it('should return joi validation error: login', (done) => {
        const user = {
          email: 'jenniferolibiegmail',
          password: 'testing12345',
        };
        supertest(server)
          .post('/api/v1/users/auth/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
          });
        done();
      });

      it('should return athentication error', (done) => {
        const user = {
          email: 'jenniferolibie@gmail.com',
          password: 'testing1234',
        };
        supertest(server)
          .post('/api/v1/users/auth/login')
          .send(user)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
          });
        done();
      });
    });
  });
});
