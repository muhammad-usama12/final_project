import db from '../connection.js';

export const getComments = async () => {
  const queryDef = {
    text: 'SELECT comments.*, users.username, users.icon_url from comments JOIN users ON users.id = user_id WHERE post_id = 1'
  }

  const data = await db.query(queryDef);

  return data.rows;
};
