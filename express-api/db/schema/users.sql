DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    bio TEXT,
    icon_url VARCHAR(255) DEFAULT "https://freesvg.org/img/TV_vintage.png",
    password VARCHAR(255) NOT NULL
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
