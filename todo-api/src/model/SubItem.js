/*
SubItem
    id(primary key and index),
    title stores the todo text, 
    completed stores the status of todoItem
    todoItemId stores the id of the task it is related to.
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubItemSchema = Schema(
  {
    title: Schema.Types.String,
    completed: Schema.Types.Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubItem", SubItemSchema);
