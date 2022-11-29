import db from '../connection.js';

export const getComments = async () => {
  const queryDef = {
    text: 'SELECT comments.*, users.username, users.icon_url from comments JOIN users ON users.id = user_id ORDER BY comments.created_at ASC'
  }

  const data = await db.query(queryDef);

  return data.rows;
};

export const addComment = async (comment) => {

  const setColumns = [...Object.values(comment)]

  const data = await db.query
  (`
     INSERT INTO comments (text, post_id, user_id) VALUES ($1, $2, $3)
     RETURNING *;
     `, [...setColumns, 1]
  )
   return data.rows[0];
 };
