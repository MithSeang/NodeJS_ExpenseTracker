const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(".database.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the database.");
  }
});
db.serialize((err) => {
  if (err) {
    console.log("Faild to serialize error " + err.message);
  } else {
    db.run("PRAGMA foreign_keys = ON");
    let sql = `CREATE TABLE IF NOT EXISTS USERS (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      USERNAME TEXT NOT NULL UNIQUE,
      EMAIL TEXT NOT NULL UNIQUE,
      HASH_PASS TEXT NOT NULL
    )`;
    db.run(sql, (err) => {
      if (err) {
        console.log("Failed to create table users" + err.message);
      }
      console.log("Created table users");
    });
    let sql1 = `CREATE TABLE IF NOT EXISTS EXPENSES (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INTEGER NOT NULL,
    AMOUNT DECIMAL(10,2) NOT NULL,
    CATEGORY TEXT NOT NULL,
    DATE DATE NOT NULL,
    NOTES TEXT ,
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID) ON DELETE CASCADE 
    )`;
    db.run(sql1, (err) => {
      if (err) {
        console.log("Failed to create table expenses" + err.message);
      } else {
        console.log("created table expenses");
      }
    });

    console.log("Tables created");
  }
});
module.exports = db;
