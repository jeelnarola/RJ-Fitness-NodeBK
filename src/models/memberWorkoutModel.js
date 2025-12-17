import mongoose from "mongoose";

const memberWorkoutSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Trainer/Admin
      required: true,
    },

    sets: {
      type: Number,
      default: 3,
    },

    reps: {
      type: Number,
      default: 10,
    },

    scheduleDate: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: Date,

    notes: String,
  },
  { timestamps: true }
);

export const MemberWorkout = mongoose.model(
  "MemberWorkout",
  memberWorkoutSchema
);
