const expenseController = require("../controller/expense.controller");
const verifyToken = require("../middleware/auth.middleware");
const expense = (app) => {
  app.get("/api/expenses", verifyToken, expenseController.getExpenses);
  app.post("/api/expense", verifyToken, expenseController.createExpense);
  app.put("/api/expense/:id", verifyToken, expenseController.updateExpense);
  app.delete("/api/expense/:id", verifyToken, expenseController.deleteExpense);
};
module.exports = expense;
