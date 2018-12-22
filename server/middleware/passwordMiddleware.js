import crypto from 'crypto'; // Built-in encryption module
import secrets from './ENV.json';

export default (userPassword) => {
  const hashPassword = crypto.createHash('sha256').update(userPassword).digest(secrets.base);
  return hashPassword;
};
