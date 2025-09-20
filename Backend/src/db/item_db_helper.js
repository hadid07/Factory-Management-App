const db = require('./dbcon.js');
const ItemdbHelper = {
    addItem: (name) => {
        try {
            const stmt = db.prepare(`INSERT INTO items (name) VALUES (?)`);
            const info = stmt.run(name); // Executes the insert
            return { id: info.lastInsertRowid, ...name }; // Return inserted data
        } catch (error) {
            console.error('Error adding item:', error);
        }
    },
    getItems: () => {
        const stmt = db.prepare(`SELECT * FROM items`);
        return stmt.all();
    },
    deleteItem: (id)=>{
        const stmt = db.prepare(`DELETE FROM items WHERE id = ?`);
        return stmt.run(id);
    }
}
module.exports = ItemdbHelper;