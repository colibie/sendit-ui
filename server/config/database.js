import pg from 'pg';

module.exports = async () => {
  try {
    // const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sendit';
    const connectionString = {
      user: 'postgres',
      database: 'sendit',
      host: 'localhost',
    };
    const client = await new pg.Client(connectionString);
    client.connect();
  } catch (error) {
    console.log({ err: error, message: 'Database connection error' });
  }
};
