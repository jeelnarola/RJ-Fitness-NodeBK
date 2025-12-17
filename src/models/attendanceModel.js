import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Normalized date (00:00:00)
    date: {
      type: Date,
      required: true,
      index: true
    },

    checkInTime: {
      type: Date,
      default: Date.now,
      required: true
    },

    checkOutTime: {
      type: Date
    },

    status: {
      type: String,
      enum: ["present", "absent"],
      default: "absent"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/// ✅ Prevent multiple attendance per user per day
attendanceSchema.index(
  { createdBy: 1, date: 1 },
  { unique: true }
);

/// ✅ Virtual: Total Time
attendanceSchema.virtual("totalTime").get(function () {
  if (!this.checkInTime || !this.checkOutTime) return null;

  const diffMs = this.checkOutTime - this.checkInTime;
  const totalMinutes = Math.floor(diffMs / 1000 / 60);

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
    totalMinutes
  };
});

/// ✅ Helper: Today date
attendanceSchema.statics.getTodayDate = function () {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const Attendance = mongoose.model("Attendance", attendanceSchema);
