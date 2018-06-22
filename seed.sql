CREATE TABLE messages (id SERIAL PRIMARY KEY, text TEXT);

CREATE TABLE tags (id SERIAL PRIMARY KEY, name TEXT);

CREATE TABLE messages_tags (id SERIAL PRIMARY KEY, message_id INTEGER, tag_id INTEGER, 
FOREIGN KEY(message_id) REFERENCES messages (id) ON DELETE CASCADE, FOREIGN KEY (tag_id) REFERENCES tags 
(id) ON DELETE CASCADE);

INSERT INTO messages (text) VALUES ('first'), ('second'), ('third');

INSERT INTO tags (name) VALUES ('funny'), ('happy'), ('silly');

INSERT INTO messages_tags (message_id, tag_id) VALUES (1,1), (1,2), (2,1), (2,3), (3,3);