import { Expense } from "../../models/expenseModel.js";

export const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId && userId.role !== "Admin") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let expenses = await Expense.find().sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId && userId.role !== "Admin") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { title, amount, category, date, notes } = req.body;
    const newExpense = new Expense({
      user: userId,
      title,
      amount,
      category,
      date,
      notes,
    });

    await newExpense.save();
    res
      .status(201)
      .json({ success: true, message: "Expense added successfully" });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId && userId.role !== "Admin") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const expenseId = req.params.id;
    const updateData = req.body;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    Object.assign(expense, updateData);
    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId && userId.role !== "Admin") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Expense IDs are required",
      });
    }
    await Expense.deleteMany({
      _id: { $in: ids },
    });

    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
