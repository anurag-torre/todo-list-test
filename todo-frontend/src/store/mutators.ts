import todoItem, { subItem } from "../interfaces/todoItem";
import {
  addSubItemToItem,
  addTodo,
  deleteAllCompleted,
  deleteSubItemFromItem,
  deleteTodo,
  updateSubItemInItem,
  updateTodo,
} from "../network/httpClient";

export async function addItemToList(
  title: string,
  oldList: todoItem[]
): Promise<todoItem[]> {
  const newList = [...oldList];
  const newTodoItem = {
    title: title,
    completed: false,
    subItems: [],
  };
  const saveTodoItem = await addTodo(newTodoItem);
  newList.push(saveTodoItem);
  return newList;
}

export async function deleteItemFromList(
  todoItemId: string,
  oldList: todoItem[]
) {
  const deletedItem = await deleteTodo(todoItemId);
  const newList = [...oldList].filter((e) => e._id !== deletedItem._id);
  return newList;
}

export async function updateItemInList(
  newTodoItem: todoItem,
  oldList: todoItem[]
) {
  const updatedItem = await updateTodo(newTodoItem);
  const newList = [...oldList];
  const originalIndex = newList.findIndex((e) => e._id === newTodoItem._id);
  // eslint-disable-next-line
  newList[originalIndex] = updatedItem;
  return newList;
}

export async function addSubItemToList(
  subItem: subItem,
  todoItemId: string,
  oldList: todoItem[]
): Promise<todoItem[]> {
  const newList = [...oldList];
  const newSubItem = await addSubItemToItem(subItem, todoItemId);
  const originalItem = newList.find((e) => e._id === todoItemId);
  if (originalItem) {
    originalItem.subItems.push(newSubItem);
  }
  return newList;
}

export async function deleteSubItemFromList(
  subItemId: string | undefined,
  todoItemId: string | undefined,
  oldList: todoItem[]
) {
  const newList = [...oldList];
  const deletedSubItem = await deleteSubItemFromItem(subItemId, todoItemId);
  const originalItem = newList.find((e) => e._id === todoItemId);
  if (originalItem) {
    originalItem.subItems = originalItem.subItems.filter(
      (e) => e._id !== deletedSubItem._id
    );
  }
  return newList;
}

export async function updateSubItemInList(
  newTodoSubItem: subItem,
  todoItemId: string | undefined,
  oldList: todoItem[]
) {
  const updatedSubItem = await updateSubItemInItem(newTodoSubItem);
  const newList = [...oldList];
  const originalItem = newList.find((e) => e._id === todoItemId);
  if (originalItem) {
    const originalSubItemIndex = originalItem?.subItems.findIndex(
      (e) => e._id === updatedSubItem._id
    );
    originalItem.subItems[originalSubItemIndex] = updatedSubItem;
  }
  return newList;
}

export async function deleteCompleted() {
  const newList = await deleteAllCompleted();
  return newList;
}
