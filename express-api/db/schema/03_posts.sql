DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY NOT NULL,
    text TEXT,
    image VARCHAR(255),
    spoiler BOOLEAN DEFAULT false,
    total_likes INTEGER DEFAULT 0,
    total_comments INTEGER DEFAULT 0,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    tvshow_id INTEGER REFERENCES tvshows(id) ON DELETE CASCADE
);
