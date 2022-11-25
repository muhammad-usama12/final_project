DROP TABLE IF EXISTS user_tvshows CASCADE;

CREATE TABLE user_tvshows (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    tvshow_id VARCHAR (255) REFERENCES users(id) NOT NULL ON DELETE CASCADE
);
