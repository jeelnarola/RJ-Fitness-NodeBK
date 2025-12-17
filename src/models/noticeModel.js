import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["GENERAL", "IMPORTANT", "URGENT"],
      default: "GENERAL",
    },

    targetAudience: {
      type: String,
      enum: ["ALL", "ADMIN", "TRAINER", "MEMBER"],
      default: "ALL",
    },

    attachment: {
      url: {
        type: String, // Cloudinary / S3 / local
      },
      fileType: {
        type: String,
        enum: ["IMAGE", "PDF"],
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Notice = mongoose.model("Notice", noticeSchema);
