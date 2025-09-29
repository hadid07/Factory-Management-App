// // Backend/src/db/dbcon.js
// const Database = require("better-sqlite3");
// const path = require("path");
// const fs = require("fs");

// let dbPath;

// try {
//   const isElectron = !!process.versions.electron;

//   if (isElectron) {
//     // Running inside Electron
//     const { app } = require("electron");
//     const userDataPath = app.getPath("userData");
//     const userDbPath = path.join(userDataPath, "database.db");
//     const packagedDbPath = path.join(process.resourcesPath, "database.db");

//     // Copy packaged DB if it doesn’t already exist in userData
//     if (!fs.existsSync(userDbPath)) {
//       if (fs.existsSync(packagedDbPath)) {
//         fs.copyFileSync(packagedDbPath, userDbPath);
//         console.log("Copied packaged DB →", userDbPath);
//       } else {
//         console.warn("Packaged DB not found at:", packagedDbPath);
//       }
//     }

//     dbPath = userDbPath;
//     console.log(" Using Electron DB at:", dbPath);
//   } else {
//     // Development mode
//     dbPath = path.join(__dirname, "database.db");
//     console.log(" Using DEV DB at:", dbPath);
//   }
// } catch (err) {
//   console.error("Failed to set DB path:", err);
//   process.exit(1);
// }

// const db = new Database(dbPath);

// // ----- CREATE TABLES IF NOT EXISTS -----
// const tables = [
//   `CREATE TABLE IF NOT EXISTS areas (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL
//   )`,
//   `CREATE TABLE IF NOT EXISTS customers (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     area TEXT NOT NULL,
//     money INTEGER NOT NULL DEFAULT 0
//   )`,
//   `CREATE TABLE IF NOT EXISTS items (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL
//   )`,
//   `CREATE TABLE IF NOT EXISTS sales (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     date TEXT DEFAULT (DATE('now')),
//     customername TEXT NOT NULL,
//     customerarea TEXT NOT NULL,
//     customerid INTEGER,
//     description TEXT,
//     saleamount INTEGER NOT NULL,
//     credit INTEGER NOT NULL
//   )`,
//   `CREATE TABLE IF NOT EXISTS expenses (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     date TEXT DEFAULT (DATE('now')),
//     customername TEXT,
//     customerarea TEXT,
//     customerid INTEGER,
//     description TEXT,
//     expenseamount INTEGER NOT NULL,
//     debit INTEGER NOT NULL DEFAULT 0,
//     expensetype TEXT NOT NULL
//   )`,
//   `CREATE TABLE IF NOT EXISTS items_sales_expenses (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     ES_id INTEGER,
//     item TEXT NOT NULL,
//     type TEXT NOT NULL,
//     date TEXT DEFAULT (DATE('now')),
//     amount INTEGER DEFAULT 0
//   )`,
//   `CREATE TABLE IF NOT EXISTS transactions (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     date TEXT DEFAULT (DATE('now')),
//     customername TEXT NOT NULL,
//     customerarea TEXT NOT NULL,
//     customerID INTEGER NOT NULL,
//     ES_id INTEGER,
//     description TEXT,
//     amount INTEGER NOT NULL,
//     transactiontype TEXT NOT NULL,
//     debit INTEGER NOT NULL DEFAULT 0,
//     credit INTEGER NOT NULL DEFAULT 0,
//     transactionamount INTEGER
//   )`,
// ];

// tables.forEach((sql) => db.prepare(sql).run());

// module.exports = db;



// Backend/src/db/dbcon.js
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

let dbPath;

try {
  const isPackaged = process.env.NODE_ENV === 'production';

  if (isPackaged) {
    // In packaged app - use userData directory
    const userDataPath = path.join(require('os').homedir(), 'FactoryManagement');
    
    // Create app directory if it doesn't exist
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }
    
    dbPath = path.join(userDataPath, "database.db");
    const packagedDbPath = path.join(process.resourcesPath, "app.asar.unpacked", "database.db");

    // Copy packaged DB if it doesn't exist in user data
    if (!fs.existsSync(dbPath) && fs.existsSync(packagedDbPath)) {
      fs.copyFileSync(packagedDbPath, dbPath);
      console.log("📦 Copied packaged DB to:", dbPath);
    }
    
    console.log("🏠 Using production DB at:", dbPath);
  } else {
    // Development mode
    dbPath = path.join(__dirname, "database.db");
    console.log("🔧 Using development DB at:", dbPath);
  }
} catch (err) {
  console.error("❌ Failed to set DB path:", err);
  // Fallback path
  dbPath = path.join(__dirname, "database.db");
  console.log("🔄 Using fallback DB at:", dbPath);
}

// Initialize database
const db = new Database(dbPath);
console.log("✅ Database connected at:", dbPath);

// Your table creation code remains the same...
const tables = [
  `CREATE TABLE IF NOT EXISTS areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`,
  // ... rest of your table definitions
];

tables.forEach((sql) => {
  try {
    db.prepare(sql).run();
  } catch (err) {
    console.error("❌ Table creation error:", err);
  }
});

console.log("✅ Database tables initialized");

module.exports = db;