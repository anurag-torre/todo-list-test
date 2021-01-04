require("mongoose");
const TodoItem = require("../model/TodoItem");
const SubItem = require("../model/SubItem");

const subItemService = {
  addSubItem: async ({ title, completed, todoItemId }) => {
    const subItem = await new SubItem({
      title: title,
      completed: completed,
    }).save();

    await TodoItem.findByIdAndUpdate(
      todoItemId,
      {
        $push: { subItems: subItem._id },
      },
      { useFindAndModify: false, new: true }
    ).lean();

    return subItem;
  },

  deleteSubItem: async ({ _id, todoItemId }) => {
    const subItem = await SubItem.findByIdAndDelete(_id).lean();

    await TodoItem.findByIdAndUpdate(
      todoItemId,
      {
        $pull: { subItems: subItem._id },
      },
      { useFindAndModify: false, new: true }
    ).lean();

    return subItem;
  },

  updateSubItem: (subItem) => {
    return SubItem.findByIdAndUpdate(
      subItem._id,
      { ...subItem },
      { useFindAndModify: false, new: true }
    ).lean();
  },
};

module.exports = subItemService;
