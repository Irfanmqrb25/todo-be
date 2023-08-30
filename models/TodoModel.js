import mongoose from "mongoose";

const Todo = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
  createdBy: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Todos", Todo);
