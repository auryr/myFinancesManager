-- \c myfinances_dev;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) UNIQUE NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    password_digest VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(100),
    photo VARCHAR(255),
    auth_token VARCHAR(255),
    attempts INTEGER,
    blocked BOOLEAN
);


CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description VARCHAR(255),
    include BOOLEAN,
    operation VARCHAR(1),
    user_id INTEGER REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS budget (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description VARCHAR(255),
    initdate VARCHAR(10),
    enddate VARCHAR(10),
    amount  DECIMAL(12,2),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transaction (
    id SERIAL PRIMARY KEY,
    note VARCHAR(255),
    trdate VARCHAR(10),
    amount  DECIMAL(12,2),
    receipt VARCHAR(20),
    category_id INTEGER REFERENCES category(id)
);

