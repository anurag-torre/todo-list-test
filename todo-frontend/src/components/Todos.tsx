import React, { useState, useEffect, KeyboardEvent } from 'react';
import TodoItem from './TodoItem';
import todoItem, { subItem } from '../interfaces/todoItem';
import { getAllTodos } from '../network/httpClient'
import { addItemToList, addSubItemToList, deleteCompleted, deleteItemFromList, deleteSubItemFromList, updateItemInList, updateSubItemInList } from '../store/mutators';

import './Todos.css'

interface TodosProps {
    setToken: Function
}

export default function Todos({ setToken }: TodosProps) {
    const [todoItem, setTodoItem] = useState("");
    const [todoItemList, setTodoItemList] = useState<todoItem[]>([]);
    const [view, setView] = useState("All")
    const views = ["All", "Active", "Completed"]

    useEffect(() => {
        getAllTodos()
            .then(
                todoItems => {
                    setTodoItemList(todoItems)
                }
            )
            .catch(console.error)
    }, [])

    function getItemListForView() {
        switch (view) {
            case "Active":
                return todoItemList.filter(e => !e.completed)
            case "Completed":
                return todoItemList.filter(e => e.completed)
            default:
                return todoItemList;
        }
    }

    function getActiveCountText() {
        const count = todoItemList.filter(e => !e.completed).length
        return [<strong key="itemCount">{count}</strong>,
        <span key="space"> </span>,
        <span key="itemsize">{`item${count !== 1 ? 's' : ''}`}</span>,
        <span key="left"> left</span>]
    }

    async function checkAndAddTodoItem(e: KeyboardEvent): Promise<void> {
        if (e.key === 'Enter' && todoItem) {
            const newList = await addItemToList(todoItem, todoItemList)
            setTodoItemList(newList)
            setTodoItem("")
        }
    }

    async function deleteTodoItem(todoItemId: string) {
        const newList = await deleteItemFromList(todoItemId, todoItemList);
        setTodoItemList(newList)
    }

    async function updateTodoItem(newTodoItem: todoItem) {
        // const newItem = { ...todoItem, completed: !todoItem.completed, subItems: todoItem.subItems.map(e => { return { ...e, completed: !todoItem.completed } }) }
        const updatedList = await updateItemInList(newTodoItem, todoItemList)
        setTodoItemList(updatedList)
    }

    async function addSubItemToTodoItem(subItem: subItem, itemId: string) {
        const newList: todoItem[] = await addSubItemToList(subItem, itemId, todoItemList)
        setTodoItemList(newList)
    }

    async function updateSubItem(newSubItem: subItem, itemId: string | undefined) {
        const updatedList = await updateSubItemInList(newSubItem, itemId, todoItemList)
        setTodoItemList(updatedList)
    }

    async function deleteTodoSubItem(subItemId: string | undefined, itemId: string | undefined) {
        const newList: todoItem[] = await deleteSubItemFromList(subItemId, itemId, todoItemList);
        setTodoItemList(newList)
    }

    async function deleteCompletedItems() {
        const newList: todoItem[] = await deleteCompleted();
        setTodoItemList(newList);
    }

    return <section className="todoapp">
        <div>
            <header >
                <h1>todos</h1>
                <input className="new-todo" placeholder="What needs to be done?" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} onKeyUp={checkAndAddTodoItem}></input>
            </header>
            <ul className="todo-list">
                {getItemListForView().map(e =>
                    <TodoItem
                        key={e._id}
                        item={e}
                        updateTodoItem={updateTodoItem}
                        deleteTodoItem={deleteTodoItem}
                        addSubItemToTodoItem={addSubItemToTodoItem}
                        updateSubItem={updateSubItem}
                        deleteTodoSubItem={deleteTodoSubItem}
                    />)}
            </ul>
            <footer className="footer" data-reactid=".0.2">
                <span className="todo-count" data-reactid=".0.2.0">
                    {getActiveCountText()}
                </span>
                <ul className="filters" data-reactid=".0.2.1">
                    {views.map(ele => <><li data-reactid=".0.2.1.0" key={ele}>
                        <span onClick={() => setView(ele)} className={view === ele ? "activeView" : ''} data-reactid=".0.2.1.0.0">{ele}</span>
                    </li><span data-reactid=".0.2.1.1"> </span></>)}
                </ul>
                {todoItemList.some(e => e.completed) && <button className="clear-completed" onClick={deleteCompletedItems}>Clear completed</button>}
            </footer>
        </div>
        <button style={{ float: "right", marginTop: "2em" }} onClick={() => setToken(null)}>SignOut?</button>
    </section>
}