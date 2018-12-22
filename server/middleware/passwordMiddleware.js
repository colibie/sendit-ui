import crypto from 'crypto'; // Built-in encryption module

export default (userPassword) => {
  const hashPassword = crypto.createHash('sha256').update(userPassword).digest(process.env.BASE);
  return hashPassword;
};
