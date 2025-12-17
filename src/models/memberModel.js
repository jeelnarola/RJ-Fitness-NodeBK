import mongoose from "mongoose";
const memberSchema = new mongoose.Schema(
{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    membershipType: {
      type: String,
      enum: ["general", "personal"],
      default: "general",
    },
    duration: {
      type: Number, // months
      min: 1,
      max: 36,
    },
    startDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    renewalDate: Date,
    pyment:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      }
    ]
  },
  {
    timestamps: true,
  }
)

export const Member = mongoose.model("Member", memberSchema);