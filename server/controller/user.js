/* eslint-disable no-trailing-spaces */
import uuidv4 from 'uuid/v4';
import db from './index';
import hash from '../middleware/passwordMiddleware';
import doesExist from '../middleware/doesExist';
import validate from '../joiSchema/user';

const User = {
  async create(req, res) {
    // validate req.body
<<<<<<< HEAD
    const valid = validate(req.body);
    if (valid) return res.status(409).json(valid);
=======
    const valid = joi.validate(req.body, joi.signup);
    if (valid) return res.status(422).json({ status: 422, error: valid });
>>>>>>> 97964f66e9688d976c0d70ef564b78b1f5a59a77

    const password = hash(req.body.password);
    
    try {
      // check if username exists already
      let exists = await doesExist('username', req.body.username);
      if (exists) return res.status(409).send({ message: 'Username already exists' });     
      
      // check if email exists already
      exists = await doesExist('email', req.body.email);
      if (exists) return res.status(409).send({ message: 'Email already exists' }); 
      
      // continue if not duplicates
      const text = `INSERT INTO
        users(id, firstname, lastname, othernames, password, email, username, registered, createddate, modifieddate)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *`;
      const values = [
        uuidv4(),
        req.body.firstname,
        req.body.lastname,
        req.body.othernames,
        password,
        req.body.email,
        req.body.username,
        new Date(),
        new Date(),
        new Date()
      ];
      try {
        const { rows } = await db.query(text, values);
        return res.status(201).send(rows[0]);
      } catch (error) {
        return res.status(500).send(error);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
<<<<<<< HEAD

=======
  async login(req, res) {
    // validate req.body
    const valid = joi.validate(req.body, joi.login);
    if (valid) return res.status(422).json({ status: 422, error: valid });
    
    const comparePassword = hash(req.body.password);
    const text = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [req.body.email, comparePassword];
    try {
      const { rows } = await db.query(text, values);
      
      if (!rows[0]) return res.status(401).json({ status: 401, error: 'Email/Password Incorrect' });
      return res.status(200).json({
        status: 500,
        data: [{
          token: auth.setToken({ id: rows[0].id, email: rows[0].email }), 
          user: rows[0]
        }]
        
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
>>>>>>> 97964f66e9688d976c0d70ef564b78b1f5a59a77
  async getAll(req, res) {
    const text = 'SELECT * FROM users';
    try {
      const { rows } = await db.query(text, []);
<<<<<<< HEAD
      if (!rows[0]) return res.status(200).send({ message: 'No existing users' });
      return res.status(200).send(rows);
=======
      return res.status(200).json({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  },
  //  GET /users/<userId>/parcels. Fetch all parcel delivery order by a specific user.
  async getUserparcels(req, res) {
    const text = 'SELECT * FROM parcels where placedby = $1';
    try {
      const { rows } = await db.query(text, [req.params.placedby]);
      if (rows[0] && req.userData.id !== rows[0].placedby && !req.userData.admin) return res.status(401).json({ status: 401, error: 'user access denied' });
      return res.status(200).json({ status: 200, data: rows });
>>>>>>> 97964f66e9688d976c0d70ef564b78b1f5a59a77
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};

export default User;
