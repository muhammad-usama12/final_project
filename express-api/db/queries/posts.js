import db from '../connection.js';

export const getPosts = async () => {
  const data = await db.query('SELECT * FROM posts');
  return data.rows;
};
