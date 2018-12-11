const pool = require('../config/database')();

export default {
  query(text, options) {
    return new Promise((resolve, reject) => {
      pool.query(text, options)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};
