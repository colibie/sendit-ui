import uuidv4 from 'uuid/v4';
import db from './index';
import doesExist from '../middleware/doesExist';
import joi from '../joiSchema/parcel';
import * as auth from '../middleware/accessToken';

const Parcel = {
  async create(req, res) {
    const access = auth.userAuth(req);
    if (!access) return res.status(504).send({ status: 504, message: 'user access denied' });

    const valid = joi.validate(req.body, joi.create);
    if (valid) return res.status(409).json({ status: 409, message: valid });

    try {
      // check if placedBy is valid userid
      const exists = await doesExist('id', req.body.placedby);
      if (!exists) return res.status(409).send({ status: 409, message: 'user id is not valid' });

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
        return res.status(201).json({ status: 201, message: rows[0] });
      } catch (error) {
        return res.status(500).json({ status: 500, message: error });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }
};

export default Parcel;
