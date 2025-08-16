const db = require('./dbcon'); // your current better-sqlite3 instance

const AreadbHelper = {
  addArea: (areaName) => {
    const stmt = db.prepare(`INSERT INTO areas (name) VALUES (?)`);
    const info = stmt.run(areaName); // Executes the insert
    return { id: info.lastInsertRowid, name: areaName }; // Return inserted data
  },

  getAllAreas: () => {
    const stmt = db.prepare(`SELECT * FROM areas`);
    return stmt.all(); // Returns all rows
  },
  deleteArea: (areaName) => {
    const stmt = db.prepare(`DELETE FROM areas WHERE name = ?`);
    const info = stmt.run(areaName); // Executes the delete
    return info.changes > 0; // Returns true if a row was deleted
  }
};

module.exports = AreadbHelper;
