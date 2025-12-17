import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name must be less than 50 characters"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },

    phone: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, "Invalid phone number"],
    },

    dateOfBirth: Date,

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" },
    },

    // ROLE MANAGEMENT
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },

    // TRAINER FIELDS
    specialization: {
      type: [String],
     
    },
    experience: {
      type: Number,
      min: 0,
      
    },
    

    profileImage: String,
    bio: {
      type: String,
      maxlength: [500, "Bio must be less than 500 characters"],
    },

    certifications: [
      {
        name: String,
        issuedBy: String,
        year: Number,
      },
    ],

    // MEMBER FIELDS
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

    // COMMON
    joinedAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },

    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


export const User = mongoose.model("User", userSchema);
