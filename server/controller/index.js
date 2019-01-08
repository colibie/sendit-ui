let client = require('../config/database').default;

export default {
  query(text, options) {
    if (!client) client = client.connect();
    return new Promise((resolve, reject) => {
      client.query(text, options)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};
