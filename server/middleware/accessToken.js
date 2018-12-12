import jwt from 'jsonwebtoken';
import env from './ENVdevelopment.json';

export const setToken = (payload) => {
  const tokenTime = 60 * 60 * 24 * 30; // expires in 30 days
  const token = jwt.sign(payload, env.secret, {
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

export const userAuth = (req) => {
  const accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!accessToken) return false;
  const isTokenValid = verifyToken(accessToken);
  if (isTokenValid === false) return false;
  return true;
};

export const adminAuth = (req) => {
  const accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!accessToken) return false;
  const isTokenValid = verifyToken(accessToken);
  if (isTokenValid === false) return false;
  const isAdmin = req.body.isAdmin || req.params.isAdmin || req.query.isAdmin;
  if (!isAdmin) return false;
  return true;
};
