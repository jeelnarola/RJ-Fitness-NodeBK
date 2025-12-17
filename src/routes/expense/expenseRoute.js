import express from "express";
import { authChecker } from "../../middlewares/authCheckerMiddleware.js";
import { addExpense, deleteExpense, getExpense, updateExpense } from "../../controllers/expense/expenseController.js";

export const expenseRoute = express.Router();

expenseRoute.get("/", authChecker,getExpense)

expenseRoute.post("/add", authChecker,addExpense)

expenseRoute.put("/update/:id", authChecker,updateExpense)

expenseRoute.delete("/delete", authChecker,deleteExpense)
