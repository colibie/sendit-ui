/* eslint-disable no-trailing-spaces */
import db from './index';
import hash from '../middleware/passwordMiddleware';
import joi from '../joiSchema/admin';
import * as auth from '../middleware/accessToken';

const Admin = {
  async login(req, res) {
    // validate req.body
    const valid = joi.validate(req.body, joi.login);
    if (valid) return res.status(422).json({ status: 422, error: valid });
    
    const comparePassword = hash(req.body.password);
    const text = 'SELECT * FROM admins WHERE name = $1 AND password = $2';
    const values = [req.body.name, comparePassword];
    try {
      const { rows } = await db.query(text, values);
      
      if (!rows[0]) return res.status(401).json({ status: 401, error: 'Name/Password Incorrect' });
      return res.status(200).json({
        status: 500,
        data: [{
          token: auth.setToken({ id: rows[0].id, admin: true }), 
          user: rows[0]
        }]
        
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }
};

export default Admin;
