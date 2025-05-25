const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },

    lastLoginAt: {
      type: Date
    },
    orgUnit: {
      type: String
    },
    profile: {
      firstName: String,
      lastName: String,
      avatarUrl: String,
      language: {
        type: String,
        default: 'pl'
      }
    }
  });
  

module.exports = mongoose.model("user", userSchema)