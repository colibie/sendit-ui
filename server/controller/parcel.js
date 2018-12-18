import uuidv4 from 'uuid/v4';
import db from './index';
import doesExist from '../middleware/doesExist';
import joi from '../joiSchema/parcel';
import * as auth from '../middleware/accessToken';
import mail from '../middleware/mailer';

const Parcel = {
  async create(req, res) {
    const access = auth.userAuth(req);
    if (!access) return res.status(504).send({ status: 504, error: 'user access denied' });

    const valid = joi.validate(req.body, joi.create);
    if (valid) return res.status(409).json({ status: 409, error: valid });

    try {
      // check if placedBy is valid userid
      const exists = await doesExist('id', req.body.placedby);
      if (!exists) return res.status(409).send({ status: 409, error: 'user id is not valid' });

      const text = `INSERT INTO
      parcels(id, placedby, weight, weightmetric, senton, currentlocation, sentfrom, sentto, description)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
      const values = [
        uuidv4(),
        req.body.placedby,
        req.body.weight,
        req.body.weightmetric,
        new Date(),
        req.body.sentfrom, // at the time of sending, currentlocation == sentfrom
        req.body.sentfrom,
        req.body.sentto,
        req.body.description
      ];
      try {
        const { rows } = await db.query(text, values);
        return res.status(201).json({
          status: 201,
          data: [{
            id: rows[0].id,
            message: 'Order created'
          }]
        });
      } catch (error) {
        return res.status(500).json({ status: 500, error });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  async getAll(req, res) {
    const access = auth.adminAuth(req);
    if (!access) return res.status(504).json({ status: 504, error: 'user access denied' });

    const text = 'SELECT * FROM parcels';
    try {
      const { rows } = await db.query(text, []);
      return res.status(200).json({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  async getById(req, res) {
    const userAccess = auth.userAuth(req);
    const adminAccess = auth.adminAuth(req);
    if (!(userAccess || adminAccess)) return res.status(504).json({ status: 504, error: 'user access denied' });

    const text = 'SELECT * FROM parcels where id = $1';
    try {
      const { rows } = await db.query(text, [req.params.parcelId]);
      if (userAccess && !adminAccess) {
        if (!rows[0]) return res.status(200).json({ status: 200, data: rows });
        if (rows[0].placedby !== req.params.placedby) return res.status(504).json({ status: 504, error: 'user access denied' });
      }
      return res.status(200).json({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  async changeDestination(req, res) {
    const userAccess = auth.userAuth(req);
    const adminAccess = auth.adminAuth(req);
    if (!(userAccess || adminAccess)) return res.status(504).json({ status: 504, error: 'user access denied' });

    let text = 'SELECT * FROM parcels where id = $1';

    try {
      const { rows } = await db.query(text, [req.params.parcelId]);
      // check if user id corresponds with placedby value

      if (req.body.placedby !== rows[0].placedby && !adminAccess) {
        return res.status(504).json({ status: 504, error: 'user unauthorized' });
      }
      // check if parcel is yet to be delivered
      if (rows[0].status === 'delivered') return res.status(504).json({ status: 504, error: 'action not allowed. Parcel already delivered' });
      text = 'UPDATE parcels SET sentto = $1 WHERE id = $2 returning *';
      try {
        const { rows } = await db.query(text, [req.body.sentto, req.params.parcelId]);
        mail(req.body.userEmail, rows[0].id, 'Parcel Destination change', rows[0].sentto);
        return res.status(200).json({
          status: 200,
          data: [{
            id: rows[0].id,
            sentto: rows[0].sentto,
            message: 'Parcel destination changed'
          }]
        });
      } catch (error) {
        return res.status(500).json({ status: 500, error });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  // PATCH  /parcels/<parcelId>/cancel. Cancel a specific parcel delivery order.
  async cancel(req, res) {
    const userAccess = auth.userAuth(req);
    const adminAccess = auth.adminAuth(req);
    if (!(userAccess || adminAccess)) return res.status(504).json({ status: 504, error: 'user access denied' });

    let text = 'SELECT * FROM parcels where id = $1';

    try {
      const { rows } = await db.query(text, [req.params.parcelId]);
      // check if user id corresponds with placedby value
      if (req.body.placedby !== rows[0].placedby && !adminAccess) {
        return res.status(504).json({ status: 504, error: 'user unauthorized' });
      }
      if (rows[0].active === 'false') return res.status(504).json({ status: 504, error: 'Parcel already cancelled' });
      if (rows[0].status === 'delivered') return res.status(504).json({ status: 504, error: 'action not allowed. Parcel already delivered' });

      text = 'UPDATE parcels SET active = $1 WHERE id = $2 returning *';
      try {
        const { rows } = await db.query(text, [false, req.params.parcelId]);
        mail(req.body.userEmail, rows[0].id, 'Parcel Order Cancellation', false);
        return res.status(200).json({
          status: 200,
          data: [{
            id: rows[0].id,
            active: rows[0].active,
            message: 'Parcel order cancelled'
          }]
        });
      } catch (error) {
        return res.status(500).json({ status: 500, error });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  // PATCH  /parcels/<parcelId>/status. Change the status of a specific parcel delivery order.
  // Only the Admin is allowed to access this endpoint.
  // include user email in req.body
  async changeStatus(req, res) {
    const access = auth.adminAuth(req); // verify it's admin trying to change status
    if (!access) return res.status(504).json({ status: 504, error: 'user access denied' });

    const text = 'UPDATE parcels SET status = $1 WHERE id = $2 returning *';
    try {
      const { rows } = await db.query(text, [req.body.status, req.params.parcelId]);
      if (!rows[0]) res.status(504).json({ status: 504, error: 'parcel not found' });
      mail(req.body.userEmail, rows[0].id, 'Parcel Status change', rows[0].status);
      return res.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          status: rows[0].status,
          message: 'Parcel Status Updated'
        }]
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  // PATCH  /parcels/<parcelId>/currentlocation.
  // Change the present location of a specific parcel delivery order.
  // Only the Admin is allowed to access this endpoint..
  async changeLocation(req, res) {
    const access = auth.adminAuth(req);
    if (!access) return res.status(504).json({ status: 504, error: 'user access denied' });

    const text = 'UPDATE parcels SET currentlocation = $1 WHERE id = $2 returning *';
    try {
      const { rows } = await db.query(text, [req.body.currentlocation, req.params.parcelId]);
      if (!rows[0]) res.status(504).json({ status: 504, error: 'parcel not found' });
      mail(req.body.userEmail, rows[0].id, 'Parcel Current Location change', rows[0].currentlocation);
      return res.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          currentlocation: rows[0].currentlocation,
          message: 'Parcel location updated'
        }]
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
};

export default Parcel;
