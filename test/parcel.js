/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
// require dev-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { should as _should, use, request } from 'chai';

import chaiHttp from 'chai-http';

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
      request(server)
        .get('/api/v1/parcels/?isAdmin=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
        .end((err, res) => {
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });

    it('should GET parcel by id', (done) => {
      request(server)
        .get('api/v1/parcels/ce46cf2a-f2bf-47b1-b4bc-b9b8d78845cb?isAdmin=true&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
        });
      done();
    });

    // it doesnt even get to the point of verifying user since parcel doesn't exist
    it('should GET parcel by id after user authentication', (done) => {
      request(server)
        .get('api/v1/parcels/ce46cf2a-f2bf-47b1-b4bc-b9b8d78845cb?userId=af0c6db5-c95f-4275-b63d-33d6346ce342&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
        .end((err, res) => {
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
        placedby: 'af0c6db5-c95f-4275-b63d-33d6346ce342', // this changes: how to solve it?
        weight: 20.4,
        weightmetric: 'kg',
        sentfrom: 'ghana',
        sentto: 'onitsha',
        description: 'black shoe',
      };
      request(server)
        .post('/api/v1/parcels/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
        .send(parcel)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('placedby').lengthOf.above(5);
        });
      done();
    });
  });

  describe('/PATCH parcels', () => {
    it('should change parcel\'s status', (done) => {
      const parcelUpdate = {
        placedby: 'af0c6db5-c95f-4275-b63d-33d6346ce342',
        userEmail: 'jenniferolibie@gmail.com',
        status: 'transiting',
      };
      request(server)
        .patch('/api/v1/parcels/ce46cf2a-f2bf-47b1-b4bc-b9b8d78845cb/status?isAdmin=true&&'
        + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
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
        placedby: 'af0c6db5-c95f-4275-b63d-33d6346ce342',
        userEmail: 'jenniferolibie@gmail.com',
        sentto: 'Akure',
      };
      request(server)
        .patch('/api/v1/parcels/ce46cf2a-f2bf-47b1-b4bc-b9b8d78845cb/destination?'
        + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
        .send(parcelUpdate)
        .end((err, res) => {
          console.log('jkjj');
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
        placedby: 'af0c6db5-c95f-4275-b63d-33d6346ce342',
        userEmail: 'jenniferolibie@gmail.com',
        currentlocation: 'Aba',
      };
      request(server)
        .patch('/api/v1/parcels/ce46cf2a-f2bf-47b1-b4bc-b9b8d78845cb/currentlocation?isAdmin=true&&'
        + 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4Y2RhY2I5LTk4ZjgtNDU5ZS1hOGYzLWRkYzExYzhjMmE0ZCIsImlhdCI6MTU0NDY0NTk5MSwiZXhwIjoxNTQ3MjM3OTkxfQ.xgOku7K9vriqpiRh4eb1ECC7PHWbVmRw4YefapZLYYE')
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
  });
});
