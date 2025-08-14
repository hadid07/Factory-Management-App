const DataBase = require('better-sqlite3');
const path = require('path')
const dbPath = path.join(__dirname, '/database.db');
// console.log(__dirname);
const db = new DataBase(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();

console.log(`Database initialized at ${dbPath}`);

module.exports = db;