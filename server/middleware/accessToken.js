import jwt from 'jsonwebtoken';
import env from './ENVdevelopment.json';
import db from '../controller/index';

export const setToken = (payload) => {
  const tokenTime = 60 * 60 * 24 * 30; // expires in 30 days
  const token = jwt.sign(payload, env.secret, {
    expiresIn: tokenTime
  });
  return token;
};

export const setAdminToken = (payload) => {
  const tokenTime = 60 * 60 * 24 * 30; // expires in 30 days
  const token = jwt.sign(payload, env.adminSecret, {
    expiresIn: tokenTime
  });
  return token;
};

export const verifyToken = (accessToken) => {
  let output;
  jwt.verify(accessToken, env.secret, (err) => {
    output = !err;
  });
  return output;
};

export const verifyAdminToken = (accessToken) => {
  let output;
  jwt.verify(accessToken, env.adminSecret, (err) => {
    output = !err;
  });
  return output;
};

export const userAuth = (req) => {
  const accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!accessToken) return false;
  const isTokenValid = verifyToken(accessToken);
  if (isTokenValid === false) return false;
  return true;
};

export const adminAuth = async (req) => {
  const accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!accessToken) return false;
  const isTokenValid = verifyAdminToken(accessToken);
  if (isTokenValid === false) return false;

  // check if admin id exists in db
  const text = 'SELECT * FROM admins WHERE id = $1';
  try {
    const { rows } = await db.query(text, [req.params.adminId]);
    if (!rows[0]) return false;
  } catch (error) {
    return console.log(error);
  }
  return true;
};
