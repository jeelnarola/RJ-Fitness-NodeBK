import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentId: {
      type: String,
      default: null, // Will be updated after successful payment
    },

    currency: {
      type: String,
      default: "USDT",
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    paymentMethod: {
        type: String,
        enum: ["WALLET", "CARD", "UPI","CASH"],  
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    receiptUrl: {
      type: String,
      default: null,
    },    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
