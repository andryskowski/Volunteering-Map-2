const mongoose = require("mongoose");

const today = new Date();
today.setHours(today.getHours() + 1);

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: today.toISOString()
    },
    updatedAt: {
      type: Date,
      default: today.toISOString()
    },
    // visitedAt: {
    //   type: Date,
    //   default: today.toISOString()
    // },
  },
);

module.exports = mongoose.model("Conversation", ConversationSchema);