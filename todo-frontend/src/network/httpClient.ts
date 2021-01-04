import axios from "axios";
import todoItem, { subItem } from "../interfaces/todoItem";

const apiUrl = "http://localhost:5000/api";

export function getAllTodos() {
  return axios
    .get(`${apiUrl}/item`)
    .then((data) => data.data)
    .catch((error) => error);
}

export async function addTodo(todoItem: {
  title: string;
  completed: boolean;
  subItems: never[];
}) {
  try {
    const data = await axios.post(`${apiUrl}/item`, todoItem);
    return data.data;
  } catch (error) {
    return error;
  }
}

export async function deleteTodo(todoId: string) {
  try {
    const data = await axios.delete(`${apiUrl}/item/${todoId}`);
    return data.data;
  } catch (error) {
    return error;
  }
}

export async function updateTodo(todoItem: todoItem) {
  try {
    const data = await axios.put(`${apiUrl}/item`, { ...todoItem });
    return data.data;
  } catch (error) {
    return error;
  }
}

export async function addSubItemToItem(
  newTodoSubItem: subItem,
  itemId: string
) {
  try {
    const data = await axios.post(`${apiUrl}/subItem/`, {
      ...newTodoSubItem,
      todoItemId: itemId,
    });
    return data.data;
  } catch (error) {
    return error;
  }
}
export async function deleteSubItemFromItem(
  subItemId: string | undefined,
  itemId: string | undefined
) {
  try {
    const data = await axios.delete(`${apiUrl}/subItem/`, {
      data: {
        _id: subItemId,
        todoItemId: itemId,
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
}

export async function updateSubItemInItem(subItem: subItem) {
  try {
    const data = await axios.put(`${apiUrl}/subItem/`, { ...subItem });
    return data.data;
  } catch (error) {
    return error;
  }
}

export async function deleteAllCompleted() {
  try {
    const data = await axios.delete(`${apiUrl}/item/items/completed`);
    return data.data;
  } catch (error) {
    return error;
  }
}
