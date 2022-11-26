import db from '../connection.js';

export const getPosts = async () => {
  const data = await db.query('SELECT *, tvshows.name as show FROM posts JOIN tvshows ON tvshows.id = tvshow_id');

  return data.rows;
};
