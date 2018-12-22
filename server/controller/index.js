const db = require('../config/database');

let pool;
export default {
  query(text, options) {
    if (!pool) pool = db();
    return new Promise((resolve, reject) => {
      pool.query(text, options)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};
