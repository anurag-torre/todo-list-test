require("mongoose");
const TodoItem = require("../model/TodoItem");
const SubItem = require("../model/SubItem");

const todoItemService = {
  getAllTodos: () => {
    return TodoItem.find({}).populate("subItems").lean();
  },

  saveTodo: ({ title, completed, subItems }) => {
    return new TodoItem({
      title: title,
      completed: completed,
      subItems: subItems,
    }).save();
  },

  deleteTodo: async (_id) => {
    try {
      const data = await TodoItem.findByIdAndDelete(_id).lean();
      await SubItem.deleteMany({ _id: data.subItems }).lean();
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateTodo: async ({ _id, title, completed, subItems }) => {
    try {
      const updatedItem = await TodoItem.findByIdAndUpdate(
        _id,
        {
          _id: _id,
          title: title,
          completed: completed,
          subItems: subItems,
        },
        { new: true, useFindAndModify: false }
      ).lean();

      await SubItem.updateMany(
        { _id: { $in: updatedItem.subItems } },
        {
          completed: updatedItem.completed,
        }
      ).lean();

      const data = TodoItem.findById(updatedItem._id)
        .populate("subItems")
        .lean();

      return data;
    } catch (error) {
      throw error;
    }
  },

  deleteCompleted: async () => {
    try {
      const subItemIds = await TodoItem.find({ completed: true })
        .select("subItems")
        .lean()
        .then((subItems) => subItems.flatMap((e) => e.subItems));

      await SubItem.deleteMany({ _id: subItemIds }).lean();

      await TodoItem.deleteMany({ completed: true }).lean();

      const data = await TodoItem.find({}).populate("subItems").lean();

      return data;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = todoItemService;
