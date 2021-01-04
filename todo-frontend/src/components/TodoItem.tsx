import React, { useState, KeyboardEvent } from 'react';
import todoItem, { subItem } from '../interfaces/todoItem';
import './TodoItem.css'
import TodoSubItem from './TodoSubItem';

interface TodoItemProps {
    item: todoItem;
    updateTodoItem: (newItem: todoItem) => void,
    deleteTodoItem: Function,
    addSubItemToTodoItem: Function,
    updateSubItem: (subItem: subItem, todoItemId: string | undefined) => void,
    deleteTodoSubItem: (subItem: string | undefined, todoItemId: string | undefined) => void
}

export default function TodoItem({ item, updateTodoItem, deleteTodoItem, addSubItemToTodoItem, updateSubItem, deleteTodoSubItem }: TodoItemProps) {

    const [addMode, setAddMode] = useState(false)
    const [subItem, setSubItem] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [editedText, setEditedText] = useState(item.title)

    async function checkAndAddSubItem(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            setSubItem("")
            setAddMode(false)
        }

        if (event.key === 'Enter' && subItem) {
            const newSubItem: subItem = {
                title: subItem,
                completed: false,
            }
            await addSubItemToTodoItem(newSubItem, item._id)
            setSubItem("")
            setAddMode(false)
        }
    }

    function saveEditedText() {
        if (editedText !== item.title) {
            const editedItem: todoItem = {
                ...item, title: editedText
            }
            updateTodoItem(editedItem)
            setEditMode(false)
        }
    }

    function resetEditMode() {
        setEditMode(false)
        setEditedText(item.title)
    }

    function toggleComplete(item: todoItem) {
        const newItem = { ...item, completed: !item.completed }
        updateTodoItem(newItem)
    }

    return (<>
        <li key={item._id}>
            <input type="checkbox" className="todo-check " onClick={() => toggleComplete(item)} defaultChecked={item.completed} />
            {editMode ?
                <input
                    autoFocus
                    className="edit"
                    onBlur={saveEditedText}
                    value={editedText}
                    onKeyUp={(e) => (e.key === 'Enter' && saveEditedText()) || (e.key === 'Escape' && resetEditMode())}
                    onChange={e => setEditedText(e.target.value)}
                />
                : <label className={item.completed ? `completedItem ` : ``}
                    onDoubleClick={() => setEditMode(true)} >
                    {item.title}
                </label>
            }
            {!addMode && !editMode && <button className="destroy" onClick={() => deleteTodoItem(item._id)}></button>}
            {!addMode && !editMode && <button className="addItem" onClick={() => setAddMode(true)}></button>}
        </li>
        <div>
            {
                addMode &&
                <input
                    className="sub-item"
                    placeholder="Add a subitem"
                    value={subItem}
                    onChange={(e) => setSubItem(e.target.value)}
                    onKeyUp={checkAndAddSubItem}
                />
            }
        </div>
        <ul>
            {item.subItems?.map(subItem => <TodoSubItem subItem={subItem} todoItemId={item._id} updateSubItem={updateSubItem} deleteTodoSubItem={deleteTodoSubItem} />
            )}
        </ul>
    </>)
}