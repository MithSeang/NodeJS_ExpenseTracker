const db = require("../util/db");

const getExpenses = (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const sql = `SELECT u.ID AS UserId, u.USERNAME AS Username, u.EMAIL AS Email, e.ID AS ExpenseID, e.AMOUNT AS Amount, e.CATEGORY AS Category, e.DATE AS Date, e.NOTES AS Notes FROM USERS u INNER JOIN EXPENSES e ON (u.ID=e.USER_ID) WHERE e.USER_ID=? ORDER BY e.ID DESC`;
  // const sql = `SELECT * FROM EXPENSES `;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to get expenses", error: err.message });
    } else {
      res.status(200).json({
        message: "Get all expenses successfully",
        data: rows,
      });
    }
  });
};
const createExpense = (req, res) => {
  const userId = req.user.id;
  const { amount, category, date, notes } = req.body;
  if (!amount || !category || !date) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  const sql = `INSERT INTO EXPENSES (USER_ID, AMOUNT, CATEGORY, DATE, NOTES) VALUES(?,?,?,?,?)`;
  var params = [userId, amount, category, date, notes];
  db.run(sql, params, function (err, rows) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create expense", error: err.message });
    } else {
      res.status(200).json({
        message: "Create expense successfully",
        data: {
          id: this.lastID,
          userId: userId,
          amount: amount,
          category: category,
          date: date,
          notes: notes,
        },
      });
    }
  });
};
const updateExpense = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log("User id: ", { userId });
  const { amount, category, date, notes } = req.body;
  const expenseId = parseInt(id, 10); // convert string to int cuz req param as a string
  const checkSql = `SELECT ID FROM EXPENSES WHERE ID =?`;
  db.get(checkSql, [expenseId], (err, expense) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (!expense) {
      return res.status(404).json({ message: "Expense ID not found" });
    }
    // const { userId, amount, category, date, notes } = req.body;
    var params = [userId, amount, category, date, notes, expenseId];
    const sql = `UPDATE EXPENSES SET USER_ID = ?, AMOUNT=?, CATEGORY=?, DATE=?, NOTES=? WHERE ID = ?`;
    db.run(sql, params, function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to update expense", error: err.message });
      }
      // Check if any row was actually updated
      if (this.changes === 0) {
        return res.status(404).json({
          message: "Expense not found or no changes made",
        });
      } else {
        return res.status(200).json({
          message: "Update expense successfully",
          data: {
            id: expenseId,
            userId: userId,
            amount: amount,
            category: category,
            date: date,
            notes: notes,
          },
        });
      }
    });
  });

  // // const { userId, amount, category, date, notes } = req.body;
  // var params = [userId, amount, category, date, notes, id];
  // const sql = `UPDATE EXPENSES SET USER_ID = ?, AMOUNT=?, CATEGORY=?, DATE=?, NOTES=? WHERE ID = ?`;
  // db.run(sql, params, (err) => {
  //   if (err) {
  //     return res
  //       .status(500)
  //       .json({ message: "Failed to update expense", error: err.message });
  //   }
  //   // Check if any row was actually updated
  //   if (this.changes === 0) {
  //     return res.status(404).json({
  //       message: "Expense not found or no changes made",
  //     });
  //   } else {
  //     return res.status(200).json({
  //       message: "Update expense successfully",
  //       data: {
  //         id: id,
  //         userId: userId,
  //         amount: amount,
  //         category: category,
  //         date: date,
  //         notes: notes,
  //       },
  //     });
  //   }
  // });
};
const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expenseId = parseInt(id, 10); // convert string to int cuz req param as a string
  // const userId = req.user.id;
  // console.log("User id: ", { userId });

  const checkSql = `SELECT ID FROM EXPENSES WHERE ID =?`;
  db.get(checkSql, [expenseId], (err, expense) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    }

    if (!expense) {
      return res.status(404).json({ message: "Expense ID not found" });
    }
    var params = [expenseId];
    const sql = `DELETE FROM EXPENSES WHERE ID= ?`;
    db.run(sql, params, function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to delete expense", error: err.message });
      } else {
        return res.status(200).json({
          message: "Delete expense successfully",
        });
      }
    });
  });
};
module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
