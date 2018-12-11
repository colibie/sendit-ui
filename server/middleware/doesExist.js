// verify if data exists in database
import db from '../controller/index';

export default async (key, value) => {
  const search = `SELECT * FROM users WHERE ${key} = $1`;
  try {
    const { rows } = await db.query(search, [value]);
    if (rows[0]) return true;
    return false;
  } catch (error) {
    return error;
  }
};
