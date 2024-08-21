import { ReactElement, useState } from "react";
import { ITodo, ITodoContext } from "../interfaces.ts";
import { NavBar } from "./NavBar.tsx";
import { Outlet } from "react-router-dom";
import { runTests } from "../api.ts";

export function App(): ReactElement {
	// default start data
	const [taskData, setTaskData] = useState<ITodo[]>([
		{ id: 1, task: "koda", isCompleted: false, timestamp: new Date(), author: "Viktor" },
		{ id: 2, task: "springa", isCompleted: true, timestamp: new Date(), author: "Viktor" },
		{ id: 3, task: "laga middag", isCompleted: false, timestamp: new Date(), author: "Viktor" },
		{ id: 4, task: "handla", isCompleted: false, timestamp: new Date(), author: "Viktor" }
	]);

	const [newId, setNewId] = useState<number>(taskData.length + 1);
	const [nTodosCounter, setnTodosCounter] = useState<number>(taskData.length);

	const handleTaskAdd = (newTaskInput: string, newAuthorInput: string): void => {
		// create object
		const newTask: ITodo = {
			id: newId,
			task: newTaskInput,
			isCompleted: false,
			timestamp: new Date(),
			author: newAuthorInput
		};
		setTaskData([...taskData, newTask]); // append using spread syntax
		setNewId((prevIndex) => prevIndex + 1); // increase id until next time
		setnTodosCounter(taskData.length + 1); // update counter
	};

	const handleTaskClick = (todo: ITodo): void => {
		const dataCopy = [...taskData];

		// find the clicked element
		dataCopy.forEach(element => {
			if (element.id === todo.id) {
				element.isCompleted = !element.isCompleted; // toggle
			}
		});

		setTaskData(dataCopy); // update data
	};

	const handleDeleteClick = (todo: ITodo): void => {
		const dataCopy = taskData.filter(task => task.id !== todo.id); // make new array with anything BUT matching ids

		setTaskData(dataCopy); // update data
		setnTodosCounter(taskData.length - 1); // update counter
	};

	const editTodo = (updatedTodo: ITodo): void => {
		const updatedTodos = taskData.map(todo => {
			if (todo.id === updatedTodo.id) return updatedTodo;
			return todo;
		})
		setTaskData(updatedTodos);
	};

	const moveUpTodo = (id: number): void => {
		const index = taskData.findIndex(todo => todo.id === id); // find the index
		if (index === 0) return; // check for out of bounds, exit if first in arr

		// swap the data and make react render
		const newData = [...taskData];

		const temp = newData[index - 1];
		newData[index - 1] = newData[index];
		newData[index] = temp;
		setTaskData(newData);
	};

	const moveDownTodo = (id: number): void => {
		const index = taskData.findIndex(todo => todo.id === id);
		if (index === taskData.length - 1) return; // check for out of bounds, exit if last in arr

		const newData = [...taskData];

		const temp = newData[index + 1];
		newData[index + 1] = newData[index];
		newData[index] = temp;
		setTaskData(newData);
	};

	const sortByTimeAsc = (): void => {
		const newData = [...taskData];
		newData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
		setTaskData(newData);
	};

	const sortByTimeDesc = (): void => {
		const newData = [...taskData];
		newData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
		setTaskData(newData);
	};

	const sortByAuthorAsc = (): void => {
		const newData = [...taskData];
		newData.sort((a, b) => a.author.localeCompare(b.author));
		setTaskData(newData);
	};

	const sortByAuthorDesc = (): void => {
		const newData = [...taskData];
		newData.sort((a, b) => b.author.localeCompare(a.author));
		setTaskData(newData);
	};

	const todoContext: ITodoContext = {
		taskList: taskData,
		handleTaskClick,
		handleDeleteClick,
		handleTaskAdd,
		editTodo,
		moveUpTodo,
		moveDownTodo,
		sortByTimeAsc,
		sortByTimeDesc,
		sortByAuthorAsc,
		sortByAuthorDesc,
		counter: nTodosCounter,
	};

	return (
		<div className="app">
			<NavBar />
			<main className="main-content">
				<h1>Todo List</h1>
				<h2>Manage your tasks and stay organized.</h2>
				<Outlet context={todoContext} />
				<button type="button" onClick={async () => await runTests()}>run api test</button>
			</main>
		</div>
	);
}
