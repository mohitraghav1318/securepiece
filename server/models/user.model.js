const mongoose = require('mongoose');

// User schema covers core account and authentication state.
const userSchema = new mongoose.Schema(
  {
    // Basic profile information.
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    // Login identifier. Stored normalized to avoid case/space duplicates.
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },

    // Authentication secret. Hidden by default in query results.
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    // Email verification status. Gate sensitive actions until verified.
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // Login OTP fields.
    // These are only used when user chooses OTP-based login.
    loginOtpHash: {
      type: String,
      select: false,
      default: null,
    },

    loginOtpExpiresAt: {
      type: Date,
      select: false,
      default: null,
    },

    loginOtpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },

    loginOtpResendAvailableAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    // createdAt and updatedAt are managed automatically by Mongoose.
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
