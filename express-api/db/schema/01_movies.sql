-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS movies CASCADE;
CREATE TABLE movies (
    id SERIAL PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    release_date TIMESTAMP NOT NULL,
    runtime_mins INTEGER NOT NULL
);
