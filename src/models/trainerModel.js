import mongoose from "mongoose"

const trainerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number, // in years
      required: true,
    },
    certifications: [String],
    availability: {
      days: [String], // e.g., ["Monday", "Wednesday"]
      timeSlots: [String], // e.g., ["9am-11am", "2pm-4pm"]
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Member",
        },
        rating: {
          type: Number  ,
          min: 0,
          max: 5,
        },
        comment: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Trainer = mongoose.model("Trainer", trainerSchema);