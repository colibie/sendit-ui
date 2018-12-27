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

// eslint-disable-next-line no-unused-vars
const should = _should();

use(chaiHttp);

// details for populating your database and testing
const userA = {
  id: 'a4c1a330-8477-4b52-b7cf-ef290a0bbc1f',
  hashedPassowrd: '',
  parcel: 'cd1e0667-4c0f-4ff2-8af2-b323eefdb492',
};

// const userB = {
//   id: 'e3b1c65d-1053-4a08-b3eb-31f3e27cf902',
//   parcel: 'ac66bf61-241b-4527-94ea-b80f431d72e1',
// };

const token = {
  admin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluI'
  + 'jp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo',

  userA: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0YzFhMzMwLTg0NzctNGI1Mi1iN2NmLWVmMjkwYTBiYmMxZiIsImVtYWlsIjoiamVubml'
  + 'mZXJvbGliaWVAZ21haWwuY29tIiwiaWF0IjoxNTQ1MzQ2NDMwLCJleHAiOjE1NDc5Mzg0MzB9.CDPMMjTuP6KHAqI-Jnyf9IkKX5IJgeKrMhpLbtDb_O8',

  userB: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzYjFjNjVkLTEwNTMtNGEwOC1iM2ViLTMxZjNlMjdjZjkwMiIs'
  + 'ImVtYWlsIjoiY2hpZGVyYW9saWJpZUBnbWFpbC5jb20iLCJpYXQiOjE1NDU5NDg2MTksImV4cCI6MTU0ODU0MDYxOX0.MIu0tEM8kp1ebHTTqNY0GhO7Fw5ZtbFL0-joUfTmSZw'
};

describe('api/v1/parcels', () => {
  // before((done) => {
  //   const text = 'DELETE FROM parcels WHERE id!=$1';
  //   db.query(text, []);
  //   done();
  // });

  // testing the GET parsels router
  describe('/GET parcels', () => {
    it('should GET all parcels', (done) => {
      supertest(server)
        .get(`/api/v1/parcels/?token=${token.admin}`)
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });
    it('should GET parcel by id', (done) => {
      supertest(server)
        .get(`api/v1/parcels/${userA.parcel}?token=${token.admin}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
        });
      done();
    });
  });

  describe('/POST parcels', () => {
    it('should POST a parcel with required fields', (done) => {
      const parcel = {
        weight: 20.4,
        weightmetric: 'kg',
        sentfrom: 'ghana',
        sentto: 'onitsha',
        description: 'black shoe',
      };
      supertest(server)
        .post(`/api/v1/parcels/?token=${token.userB}`)
        .send(parcel)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
        });
      done();
    });

    it('should return joi validation error', (done) => {
      const parcel = {
        weight: 20.4,
        weightmetric: 'kg',
        sentfrom: 'ghana',
        description: 'black shoe',
      };
      supertest(server)
        .post(`/api/v1/parcels/?token=${token.userA}`)
        .send(parcel)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
        });
      done();
    });
  });

  describe('/PATCH parcels', () => {
    describe('/status', () => {
      it('should change parcel\'s status', (done) => {
        const parcelUpdate = {
          status: 'transiting',
        };
        supertest(server)
          .patch(`/api/v1/parcels/${userA.parcel}/status?token=${token.admin}`)
          .send(parcelUpdate)
          .end((err, res) => {
            res.should.have.status(200); // find out codes for patching. Add to tracker as chore
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('status').eql('transiting');
            res.body.data[0].should.have.property('message');
          });
        done();
      });

      it('should return 404 parcel', (done) => {
        const parcelUpdate = {
          status: 'transiting',
        };
        supertest(server)
          .patch(`/api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340d/status?token=${token.admin}`)
          .send(parcelUpdate)
          .end((err, res) => {
            res.should.have.status(404); // find out codes for patching. Add to tracker as chore
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');
          });
        done();
      });

      it('should return internal server error', (done) => {
        const parcelUpdate = {
          status: 'transiting',
        };
        supertest(server)
          .patch(`/api/v1/parcels/cd1e0667-4c0f-4ff2-8af2-b323eefdb4/status?token=${token.admin}`)
          .send(parcelUpdate)
          .end((err, res) => {
            res.should.have.status(500); // find out codes for patching. Add to tracker as chore
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');
          });
        done();
      });
    });

    describe('/destination', () => {
      it('should change parcel\'s destination', (done) => {
        const parcelUpdate = {
          sentto: 'Akure',
        };
        supertest(server)
          .patch(`/api/v1/parcels/${userA.parcel}/destination?token=${token.admin}`)
          .send(parcelUpdate)
          .end((err, res) => {
            res.should.have.status(200); // find out codes for patching. Add to tracker as chore
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('sentto').eql('Akure');
            res.body.data[0].should.have.property('message');
          });
        done();
      });

      it('should return 404 parcel', (done) => {
        const parcelUpdate = {
          sentto: 'oiku',
        };
        supertest(server)
          .patch(`/api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340d/destination?token=${token.admin}`)
          .send(parcelUpdate)
          .end((err, res) => {
            res.should.have.status(404); // find out codes for patching. Add to tracker as chore
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');
          });
        done();
      });

      it('should return internal server error', (done) => {
        const parcelUpdate = {
          sentto: 'okat',
        };
        supertest(server)
          .patch(`/api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340/destination?token=${token.admin}`)
          .send(parcelUpdate)
          .end((err, res) => {
            res.should.have.status(500); // find out codes for patching. Add to tracker as chore
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');
          });
        done();
      });
    });

    it('should change parcel\'s currentLocation', (done) => {
      const parcelUpdate = {
        currentlocation: 'Aba',
      };
      supertest(server)
        .patch(`/api/v1/parcels/${userA.parcel}/currentlocation?token=${token.admin}`)
        .send(parcelUpdate)
        .end((err, res) => {
          res.should.have.status(200); // find out codes for patching. Add to tracker as chore
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('currentlocation').eql('Aba');
          res.body.data[0].should.have.property('message');
        });
      done();
    });

    it('should cancel parcel order', (done) => {
      supertest(server)
        .patch(`/api/v1/parcels/${userA.parcel}/cancel?token=${token.admin}`)
        .send()
        .end((err, res) => {
          res.should.have.status(200); // find out codes for patching. Add to tracker as chore
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('id');
          res.body.data[0].should.have.property('active').eql(false);
          res.body.data[0].should.have.property('message');
        });
      done();
    });
  });
});
