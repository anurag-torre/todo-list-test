/*
TodoItem
    id(primary key and index),
    title stores the todo text, 
    completed stores the status of todoItem
    subItems stores the sub tasks.
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoItemSchema = Schema(
  {
    title: Schema.Types.String,
    completed: Schema.Types.Boolean,
    subItems: [{ type: Schema.Types.ObjectId, ref: "SubItem" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoItem", TodoItemSchema);
