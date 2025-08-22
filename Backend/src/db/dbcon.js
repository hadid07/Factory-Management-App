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
db.prepare(` CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    area TEXT NOT NULL,
    money INTEGER NOT NULL DEFAULT 0)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT DEFAULT (DATE('now')),
    customername TEXT NOT NULL,
    customerarea TEXT NOT NULL,
    description TEXT,
    saleamount INTEGER NOT NULL,
    credit INTEGER NOT NULL
  )
`).run();
 
db.prepare(`
  CREATE TABLE IF NOT EXISTS items_sales_expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item TEXT NOT NULL,
  type TEXT NOT NULL,
  date TEXT DEFAULT (DATE('now')),
  amount INTEGER DEFAULT 0
  )
  `).run();

console.log(`Database initialized at ${dbPath}`);

module.exports = db;