DROP TABLE IF EXISTS user_tvshows CASCADE;

CREATE TABLE user_tvshows (
    id SERIAL PRIMARY KEY NOT NULL,
    users_id INTEGER REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    tvshow_id VARCHAR (255) REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);
