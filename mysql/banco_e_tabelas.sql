
CREATE DATABASE IF NOT EXISTS sync360_db;
GRANT ALL PRIVILEGES ON sync360_db.* TO 'administrator'@'%' IDENTIFIED BY 'Admin.1234';
FLUSH PRIVILEGES;
USE sync360_db;


CREATE TABLE users (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(255) DEFAULT '',
  address VARCHAR(255) DEFAULT '',
  age INT DEFAULT -1,
  biography TEXT,
  img VARCHAR(255) DEFAULT "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO users (name, address, age, biography, img)
VALUES ('Jane Doe', 'Travessa Nova Trento,  49. Porto Alegre/RS', 27, '
Proin pellentesque bibendum risus, ac blandit ipsum. Quisque vitae cursus lectus. Curabitur eget varius mi, vel condimentum mi. Suspendisse sodales felis a tortor sagittis, ac pellentesque lorem ultrices. Maecenas fermentum lectus a ipsum condimentum vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent in aliquet sem. Etiam metus arcu, luctus mattis dui sed, sagittis congue orci. In interdum euismod neque a varius. Praesent eleifend consequat feugiat. In laoreet felis a auctor lacinia. Aliquam et ligula magna. Mauris mollis leo sit amet vulputate placerat. Fusce aliquam ut nisi quis lobortis. Integer et tristique ligula, at mollis enim.',
'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg');