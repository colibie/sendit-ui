/* eslint-disable no-trailing-spaces */
import uuidv4 from 'uuid/v4';
import db from './index';
import hash from '../middleware/passwordMiddleware';
import doesExist from '../middleware/doesExist';
import joi from '../joiSchema/user';
import * as auth from '../middleware/accessToken';

const User = {
  async create(req, res) {
    // validate req.body
    const valid = joi.validate(req.body, joi.signup);
    if (valid) return res.status(409).json({ status: 409, message: valid });

    const password = hash(req.body.password);
    
    try {
      // check if username exists already
      let exists = await doesExist('username', req.body.username);
      if (exists) return res.status(409).json({ status: 409, message: 'Username already exists' });     
      
      // check if email exists already
      exists = await doesExist('email', req.body.email);
      if (exists) return res.status(409).json({ status: 409, message: 'Email already exists' }); 
      
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
        return res.status(201).json({ status: 201, message: rows[0] });
      } catch (error) {
        return res.status(500).json({ status: 500, message: error });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  },
  async login(req, res) {
    // validate req.body
    const valid = joi.validate(req.body, joi.login);
    if (valid) return res.status(409).json({ status: 409, message: valid });
    
    const comparePassword = hash(req.body.password);
    const text = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [req.body.email, comparePassword];
    try {
      const { rows } = await db.query(text, values);
      
      if (!rows[0]) return res.status(401).json({ status: 401, message: 'Email/Password Incorrect' });
      console.log(auth.setToken({ id: rows[0].id }));
      return res.status(200).json({
        status: 500,
        isAdmin: rows[0].isadmin, 
        token: auth.setToken({ id: rows[0].id }), 
        result: rows[0] 
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  },
  async getAll(req, res) {
    const access = auth.adminAuth(req);
    if (!access) return res.status(504).json({ status: 504, message: 'user access denied' });

    const text = 'SELECT * FROM users';
    try {
      const { rows } = await db.query(text, []);
      if (!rows[0]) return res.status(200).json({ status: 200, message: 'No existing users' });
      return res.status(200).json({ status: 200, message: rows });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error });
    }
  }
};

export default User;
