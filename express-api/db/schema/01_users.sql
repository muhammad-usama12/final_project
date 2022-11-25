DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS movie_genres CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    bio TEXT,
    icon_url VARCHAR(255) DEFAULT 'https://freesvg.org/img/TV_vintage.png',
    password VARCHAR(255) NOT NULL
);
