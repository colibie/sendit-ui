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
