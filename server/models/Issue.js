const mongoose = require("mongoose")
const Schema = mongoose.Schema

const IssueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  votedUser: [{
    type: String
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})
module.exports = mongoose.model("Issue", IssueSchema)