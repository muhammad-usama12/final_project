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

  return data.rows[0];
};

export const addLike = async (id) => {

  const post_id = id

  const data = await db.query
  (`
    UPDATE posts
    SET total_likes = total_likes + 1
    where id = $1
    RETURNING *;
     `,[post_id],
  )

   return data.rows[0];
 };
