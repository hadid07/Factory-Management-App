const db = require('../db/dbcon');

const transactionsDBHelper = {
    add_transaction: async (date, customerName, customerArea, customerID, description, Amount, credit, debit, transactiontype, ES_id, transactionamount) => {
        try {
            const stmt = db.prepare(`
  INSERT INTO transactions 
  (date, customername, customerarea, customerID, ES_id, description, amount, transactiontype, debit, credit, transactionamount)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

            const info = stmt.run(
                date,
                customerName,
                customerArea,
                customerID,
                ES_id,
                description,
                Amount,
                transactiontype,
                debit,
                credit,
                transactionamount
            );

            console.log('Transaction Added');
            return info;
        } catch (err) {
            console.error("Error inserting transaction:", err);
            return false;
        }

    },
    show_all_transactions: async () => {
        try {
            const stmt = db.prepare(`SELECT * FROM transactions`);
            const transactions = stmt.all();
            return transactions;
        } catch (err) {
            console.error("Error fetching transactions:", err);
            return [];
        }
    },
    delete_transaction: async (date, transactiontype, ES_id) => {
        try {
            const stmt = db.prepare(`DELETE FROM transactions WHERE date = ? AND transactiontype = ? AND ES_id = ?`);
            const info = stmt.run(date, transactiontype, ES_id);
            console.log('Transaction Deleted');
            return info;
        } catch (err) {
            console.error("Error deleting transaction:", err);
            return false;
        }
    },
    get_transaction: async (customerID) => {
        try {
            const stmt = db.prepare(`SELECT * FROM transactions WHERE customerID = ? ORDER BY date DESC`);
            const transactions = await stmt.all(customerID);
            return transactions;
        } catch (err) {
            console.error("Error fetching transactions:", err);
            return [];
        }
    }
}
module.exports = transactionsDBHelper;