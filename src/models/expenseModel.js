import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
