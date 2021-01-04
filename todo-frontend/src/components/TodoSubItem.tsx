import React, { useState } from 'react'
import { subItem } from '../interfaces/todoItem'

interface subItemProps {
    subItem: subItem,
    todoItemId: string | undefined,
    updateSubItem: (subItem: subItem, todoItemId: string | undefined) => void,
    deleteTodoSubItem: (subItem: string | undefined, todoItemId: string | undefined) => void
}

export default function TodoSubItem({ subItem, todoItemId, updateSubItem, deleteTodoSubItem }: subItemProps) {

    const [editMode, setEditMode] = useState(false)
    const [editedText, setEditedText] = useState(subItem.title)

    function toggleSubItemComplete(subItem: subItem, todoItemId: string | undefined) {
        const newSubItem: subItem = { ...subItem, completed: !subItem.completed }
        updateSubItem(newSubItem, todoItemId)
    }


    function saveEditedText() {
        if (editedText !== subItem.title) {
            const editedItem: subItem = {
                ...subItem, title: editedText
            }
            updateSubItem(editedItem, todoItemId)
            setEditMode(false)
        }
    }

    function resetEditMode() {
        setEditMode(false)
        setEditedText(subItem.title)
    }

    return (
        <li key={subItem._id}>
            <input type="checkbox" className="todo-check" onClick={() => toggleSubItemComplete(subItem, todoItemId)} checked={subItem.completed} />
            {editMode ?
                <input
                    autoFocus
                    className="edit"
                    onBlur={saveEditedText}
                    value={editedText}
                    onKeyUp={(e) => (e.key === 'Enter' && saveEditedText()) || (e.key === 'Escape' && resetEditMode())}
                    onChange={e => setEditedText(e.target.value)}
                />
                : <label className={subItem.completed ? `completedItem ` : ``}
                    onDoubleClick={() => setEditMode(true)} >
                    {subItem.title}
                </label>
            }
            {!editMode && <button className="destroy" onClick={() => deleteTodoSubItem(subItem._id, todoItemId)}></button>}
        </li>
    )
}