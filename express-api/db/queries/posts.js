import db from '../connection.js';

export const getPosts = async () => {
  const data = await db.query('SELECT * FROM posts ORDER BY posts.id DESC');

  return data.rows;
};

export const addPost = async (post) => {

  const setColumns = [...Object.values(post)]

  const data = await db.query
    (`
      INSERT INTO posts (text, image, tvshow_id, spoiler) VALUES ($1,$2,$3,$4)
      RETURNING *;
      `, [...setColumns]
    )

  return data.rows[0];
};


