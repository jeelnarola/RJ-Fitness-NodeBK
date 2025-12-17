import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Chest", "Back", "Shoulders", "Biceps",
        "Triceps", "Legs", "Abs", "Glutes",
        "Full Body", "Warmup", "Cardio"
      ],
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    video: {
      type: String,
      default: "",
    },

    equipment: [
      {
        type: String,
        enum: [
          "Bodyweight", "Dumbbell", "Barbell", "Bench",
          "Kettlebell", "Resistance Band", "Cable Machine",
          "Smith Machine", "Pull-Up Bar", "TRX",
          "Cycle", "Treadmill", "Rope", "Medicine Ball"
        ],
        default: "Bodyweight",
      },
    ],

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    description: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin or Trainer
      required: true,
    },
  },
  { timestamps: true }
);

export const Workout = mongoose.model("Workout", workoutSchema);
