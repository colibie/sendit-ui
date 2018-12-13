/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
// require dev-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { should as _should, use, request } from 'chai';

import chaiHttp from 'chai-http';

import server from '../server/server';

import db from '../server/controller/index';

// eslint-disable-next-line no-unused-vars
const should = _should();

use(chaiHttp);

describe('api/v1/parcels', () => {
  before((done) => {
    const text = 'DELETE FROM parcels';
    db.query(text, []);
    done();
  });

  // testing the GET parsels router
  describe('/GET parcels', () => {
    it('should GET all parcels', (done) => {
      request(server)
        .get('/api/v1/parcels/?isAdmin=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });
  });

  describe('/POST parcels', () => {
    // testing the signup route
    it('should POST a parcel with required fields', (done) => {
      const parcel = {
        placedby: '66173b5e-7c4f-4d94-a308-38b04c374c0b', // this changes: how to solve it?
        weight: 20.4,
        weightmetric: 'kg',
        sentfrom: 'ghana',
        sentto: 'onitsha',
        description: 'black shoe',
      };
      request(server)
        .post('/api/v1/parcels/create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
        .send(parcel)
        .end((err, res) => {
          console.log(res.body.message);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('placedby').lengthOf.above(5);
        });
      done();
    });
  });
});
