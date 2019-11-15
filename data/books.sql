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

-- INSERT INTO books (
--   author, 
--   title, 
--   description, 
--   isbn, 
--   image_url, 
--   bookshelf)
-- VALUES (
--   'Jennifer L. Holm', 
--   'Turtle in Paradise', 
--   'In Jennifer L. Holm', 
--   '0375893164', 
--   'https://books.google.com/books/content?id=xAsByXJNjCMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', 
--   'kids');