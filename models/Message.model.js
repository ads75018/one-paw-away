const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({

  sender: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  message: {
    type: String,
    trim: true,
  },
});
const Message = model("Message", messageSchema);

module.exports = Message;
