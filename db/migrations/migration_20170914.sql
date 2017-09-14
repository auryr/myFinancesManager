\c myfinances_dev;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    password_digest VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    photo VARCHAR(255),
    auth_token VARCHAR(255),
    attempts INTEGER,
    blocked BOOLEAN
);
