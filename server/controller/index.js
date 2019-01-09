let pool = require('../config/database').default;

export default {
  query(text, options) {
    if (!pool) pool = pool.connect();
    return new Promise((resolve, reject) => {
      pool.query(text, options)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};
