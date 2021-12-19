const mongoose = require("mongoose");

const today = new Date();
today.setHours(today.getHours() + 1);

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: today.toISOString()
    },
    updatedAt: {
      type: Date,
      default: today.toISOString()
    },
    visitedAt: {
      type: Date,
      default: today.toISOString()
    },
  },
);

module.exports = mongoose.model("Message", MessageSchema);