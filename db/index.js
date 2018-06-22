const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  database: "node-pg-learn-m"
});

client.connect();

module.exports = client;
