DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  description VARCHAR,
  isbn VARCHAR(255),
  etag VARCHAR(255),
  image_url VARCHAR(255),
  bookshelf VARCHAR(255)
);


