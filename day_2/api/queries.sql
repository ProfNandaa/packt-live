USE todo_live;

-- query (1)
INSERT INTO user (name, email, password)
VALUES ('Test User', 'user@example.com', MD5('usertest'));

-- query (2)
INSERT INTO todo (title, user_id)
VALUES 
('Books to Read', '1')
('Places to Visit', '1')

-- query (3)
INSERT INTO user (name, email, password)
VALUES ('Another User', 'another@example.com', MD5('usertest'));

-- query (4)
INSERT INTO todo (title, user_id)
VALUES 
('Programming Languages to Learn', '2')
