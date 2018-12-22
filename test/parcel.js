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
        .get('/api/v1/parcels/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
        .end((err, res) => {
          should.exist(res.body);
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });

    it('should GET parcel by id', (done) => {
      supertest(server)
        .get('api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340d?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
        });
      done();
    });
  });

  describe('/POST parcels', () => {
    // testing the signup route
    it('should POST a parcel with required fields', (done) => {
      const parcel = {
        placedby: 'a4c1a330-8477-4b52-b7cf-ef290a0bbc1f', // this changes: how to solve it?
        weight: 20.4,
        weightmetric: 'kg',
        sentfrom: 'ghana',
        sentto: 'onitsha',
        description: 'black shoe',
      };
      supertest(server)
        .post('/api/v1/parcels/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0YzFhMzMwLTg0NzctNGI1Mi1iN2NmLWVmMjkwYTBiYmMxZiIsImVtYWlsIjoiamVubmlmZXJvbGliaWVAZ21haWwuY29tIiwiaWF0IjoxNTQ1MzQ2NDMwLCJleHAiOjE1NDc5Mzg0MzB9.CDPMMjTuP6KHAqI-Jnyf9IkKX5IJgeKrMhpLbtDb_O8')
        .send(parcel)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
        });
      done();
    });
  });

  describe('/PATCH parcels', () => {
    it('should change parcel\'s status', (done) => {
      const parcelUpdate = {
        status: 'transiting',
      };
      supertest(server)
        .patch('/api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340d/status?'
        + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
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

    it('should change parcel\'s destination', (done) => {
      const parcelUpdate = {
        sentto: 'Akure',
      };
      supertest(server)
        .patch('/api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340d/destination?'
        + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
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

    it('should change parcel\'s currentLocation', (done) => {
      const parcelUpdate = {
        currentlocation: 'Aba',
      };
      supertest(server)
        .patch('/api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340d/currentlocation?'
        + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
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
        .patch('/api/v1/parcels/d19910d6-e2d2-495e-ab9d-f746e16e340d/cancel?'
        + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiNDU0NTFiLTljMDctNGVjMi1hOTU3LTg2OTUwZDZjNzgwYiIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDUzNDE0MTcsImV4cCI6MTU0NzkzMzQxN30.YXWbAoxIu03ffnVnbuKxzAWKtAH33455fmmpLtPWtJo')
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
