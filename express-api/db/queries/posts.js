import db from '../connection.js';

export const getPosts = async () => {
  const data = await db.query('SELECT * FROM posts ORDER BY posts.id DESC');

  return data.rows;
};

export const addPost = async (post) => {

  const setColumns = [...Object.values(post)]
  console.log("setColumns",setColumns)
  const data = await db.query
    (`
      INSERT INTO posts (text, image, tvshow_id, spoiler, user_id) VALUES ($1,$2,$3,$4,$5)
      RETURNING *;
      `, [...setColumns]
    )
    console.log("data in addpost",data.rows)
  return data.rows[0];
};
