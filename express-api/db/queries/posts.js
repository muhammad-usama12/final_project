import db from '../connection.js';

export const getPosts = async () => {
  const data = await db.query('SELECT *, tvshows.name as show FROM posts JOIN tvshows ON tvshows.id = tvshow_id ORDER BY posts.id DESC');

  return data.rows;
};

export const getPostsByShow = async (id) => {

  const data = await db.query
    (`
      SELECT *, tvshows.name as show FROM posts JOIN tvshows ON tvshows.id = tvshow_id WHERE tvshow_id = $1 ORDER BY posts.id DESC
      `, [id]
    )

  return data.rows[0];
};

export const addPost = async (post) => {

  const setColumns = [...Object.values(post)]

  const data = await db.query
    (`
      INSERT INTO posts (text, image, tvshow_id) VALUES ($1,$2,$3)
      RETURNING *;
      `, [...setColumns]
    )

  return data.rows[0];
};


