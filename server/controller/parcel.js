import uuidv4 from 'uuid/v4';
import db from './index';
import joi from '../joiSchema/parcel';
import mail from '../middleware/mailer';

const text = `SELECT p.id, p.placedby, p.weight, p.weightmetric, p.senton, p.deliveredon, p.status,
p.active, p.currentlocation, p.sentfrom, p.sentto, p.description, u.id as user, u.username, u.email 
FROM parcels p 
INNER JOIN users u
ON p.placedby = u.id 
WHERE p.id = $1`;

const Parcel = {
  async create(req, res) {
    const valid = joi.validate(req.body, joi.create);
    if (valid) return res.status(422).json({ status: 422, error: valid });

    try {
      const text = `INSERT INTO
      parcels(id, placedby, weight, weightmetric, senton, currentlocation, sentfrom, sentto, description)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
      const values = [
        uuidv4(),
        req.userData.id,
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
    const text = `SELECT p.id, p.placedby, p.weight, p.weightmetric, p.senton, p.currentlocation, p.sentfrom, p.sentto, p.description,
    u.username, u.email FROM parcels p 
    INNER JOIN users u
    ON p.placedby = u.id `;
    try {
      const { rows } = await db.query(text, []);
      return res.status(200).json({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  async getById(req, res) {
    try {
      const { rows } = await db.query(text, [req.params.parcelId]);
      if (!req.userData.admin && rows[0]) {
        if (rows[0].placedby !== req.userData.id) return res.status(401).json({ status: 401, error: 'user access denied' });
      }
      return res.status(200).json({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  async changeDestination(req, res) {
    const update = 'UPDATE parcels SET sentto = $1 WHERE id = $2';
    try {
      await db.query(update, [req.body.sentto, req.params.parcelId]);
      // fetch parcel with user email
      const { rows } = await db.query(text, [req.params.parcelId]);
      if (!rows[0]) return res.status(404).json({ status: 404, error: 'Parcel not found' });

      // check if user id corresponds with placedby value
      if (req.userData.id !== rows[0].placedby && !req.userData.admin) {
        return res.status(401).json({ status: 401, error: 'user unauthorized' });
      }
      // check if parcel is yet to be delivered
      if (rows[0].status === 'delivered') return res.status(409).json({ status: 409, error: 'action not allowed. Parcel already delivered' });
      mail(rows[0].email, rows[0].id, 'Parcel Destination change', rows[0].sentto);
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
  },
  // PATCH  /parcels/<parcelId>/cancel. Cancel a specific parcel delivery order.
  async cancel(req, res) {
    const update = 'UPDATE parcels SET active = $1 WHERE id = $2';
    try {
      await db.query(update, [false, req.params.parcelId]);
      // fetch parcel with user email
      const { rows } = await db.query(text, [req.params.parcelId]);
      if (!rows[0]) return res.status(404).json({ status: 404, error: 'Parcel not found' });

      // check if user id corresponds with placedby value
      if (req.userData.id !== rows[0].placedby && !req.userData.admin) {
        return res.status(401).json({ status: 401, error: 'user unauthorized' });
      }
      // if (rows[0].active === 'false')
      // return res.status(409).json({ status: 409, error: 'Parcel already cancelled' });
      if (rows[0].status === 'delivered') return res.status(409).json({ status: 409, error: 'action not allowed. Parcel already delivered' });

      mail(rows[0].email, rows[0].id, 'Parcel Order Cancellation', false);
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
  },
  // PATCH  /parcels/<parcelId>/status. Change the status of a specific parcel delivery order.
  // Only the Admin is allowed to access this endpoint.
  // include user email in req.body
  async changeStatus(req, res) {
    const update = 'UPDATE parcels SET status = $1 WHERE id = $2';
    try {
      await db.query(update, [req.body.status, req.params.parcelId]);
      // fetch parcel with user email
      const { rows } = await db.query(text, [req.params.parcelId]);
      if (!rows[0]) return res.status(404).json({ status: 404, error: 'parcel not found' });
      mail(rows[0].email, rows[0].id, 'Parcel Status change', rows[0].status);
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
    const update = 'UPDATE parcels SET currentlocation = $1 WHERE id = $2';
    try {
      await db.query(update, [req.body.currentlocation, req.params.parcelId]);

      const { rows } = await db.query(text, [req.params.parcelId]);
      if (!rows[0]) return res.status(404).json({ status: 404, error: 'parcel not found' });

      mail(rows[0].email, rows[0].id, 'Parcel Current Location change', rows[0].currentlocation);
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
