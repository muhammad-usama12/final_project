import db from "../connection.js";

export const getComments = async () => {
  const queryDef = {
    text: "SELECT * from comments ORDER BY comments.created_at ASC",
  };

  const data = await db.query(queryDef);

  return data.rows;
};

export const addComment = async (comment) => {
  const setColumns = [...Object.values(comment)];
  console.log("setColumns in comments", setColumns);

  const data = await db.query(
    `
     INSERT INTO comments (text, post_id, user_id) VALUES ($1, $2, $3)
     RETURNING *;
     `,
    [...setColumns, 1]
  );
  return data.rows[0];
};

export const commentCounter = async (id) => {
  const post_id = id;

  const data = await db.query(
    `
   SELECT count(*)
   FROM comments
   where post_id = $1;
     `,
    [post_id]
  );

  return data.rows[0];
};
