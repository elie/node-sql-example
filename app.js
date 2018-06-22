const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");

app.use(bodyParser.json());

app.get("/tags", async function(req, res, next) {
  const data = await db.query("SELECT * FROM tags");
  res.send(data.rows);
});

app.get("/messages", async function(req, res, next) {
  // get all the messages and tags
  const message_and_tags = await db.query(
    "SELECT m.id,m.text, t.name FROM messages m JOIN messages_tags mt ON m.id=mt.message_id JOIN tags t ON mt.tag_id = t.id ORDER BY m.id"
  );

  // map over the original messages and add a property for each one
  let startIdx = 0;
  const data = message_and_tags.rows.reduce(function(acc, next) {
    if (startIdx !== next.id) {
      startIdx = next.id;
      next.tags = [next.name];
      delete next.name;
      acc.push(next);
    } else {
      acc[startIdx - 1].tags.push(next.name);
    }
    return acc;
  }, []);

  return res.send(data);
});

app.post("/tags", async function(req, res, next) {
  const result = await db.query(
    "INSERT INTO tags (name) VALUES ($1) RETURNING *",
    [req.body.name]
  );
  res.send(result.rows[0]);
});

app.post("/messages", async function(req, res, next) {
  const result = await db.query(
    "INSERT INTO messages (text) VALUES ($1) RETURNING *",
    [req.body.text]
  );
  res.send(result.rows[0]);
});

app.listen(3000, function() {
  console.log("getting started!");
});
