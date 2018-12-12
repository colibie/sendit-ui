/* eslint-disable no-trailing-spaces */
import uuidv4 from 'uuid/v4';
import db from './index';
import hash from '../middleware/passwordMiddleware';
import doesExist from '../middleware/doesExist';
import joi from '../joiSchema/user';
import { setToken } from '../middleware/accessToken';

const User = {
  async create(req, res) {
    // validate req.body
    const valid = joi.validate(req.body, joi.signup);
    if (valid) return res.status(409).json(valid);

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
  async login(req, res) {
    // validate req.body
    const valid = joi.validate(req.body, joi.login);
    if (valid) return res.status(409).json(valid);
    
    const comparePassword = hash(req.body.password);
    const text = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [req.body.email, comparePassword];
    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) return res.status(401).send('Email/Password Incorrect');

      return res.status(200).send({ 
        token: setToken(rows[0].id), 
        result: rows[0] 
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async getAll(req, res) {
    const text = 'SELECT * FROM users';
    try {
      const { rows } = await db.query(text, []);
      if (!rows[0]) return res.status(200).send({ message: 'No existing users' });
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};

export default User;
