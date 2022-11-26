DROP TABLE IF EXISTS tvshows CASCADE;

CREATE TABLE tvshows (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255), NOT NULL
);
