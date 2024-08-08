import { ReactElement, useState } from "react";
import { ITodo, ITodoContext } from "../interfaces.ts";
import { NavBar } from "./NavBar.tsx";
import { Outlet } from "react-router-dom";

let currentIndex: number = 4; // global id variable, update if default data is updated
export let currentTodos: number = 4; // update if default data is updated

export function App(): ReactElement {
	// default start data
	const [data, setData] = useState<ITodo[]>([
		{ id: 1, task: "koda", isCompleted: false, timestamp: new Date(), author: "Viktor" },
		{ id: 2, task: "springa", isCompleted: true, timestamp: new Date(), author: "Viktor" },
		{ id: 3, task: "laga middag", isCompleted: false, timestamp: new Date(), author: "Viktor" },
		{ id: 4, task: "handla", isCompleted: false, timestamp: new Date(), author: "Viktor" }
	]);

	const handleTaskAdd = (newTaskInput: string, newAuthorInput: string): void => {
		const newTask: ITodo = {
			id: ++currentIndex, // increase counter before using the variable
			task: newTaskInput,
			isCompleted: false,
			timestamp: new Date(),
			author: newAuthorInput
		};
		setData([...data, newTask]); // append using spread syntax
		currentTodos = data.length + 1; // update counter
	};

	const handleTaskClick = (todo: ITodo): void => {
		const dataCopy = [...data];

		// find the clicked element
		dataCopy.forEach(element => {
			if (element.id === todo.id) {
				element.isCompleted = !element.isCompleted; // toggle
			}
		});

		setData(dataCopy); // update data
	};

	const handleDeleteClick = (todo: ITodo): void => {
		const dataCopy = data.filter(task => task.id !== todo.id); // make new array with anything BUT matching ids

		setData(dataCopy); // update data
		currentTodos = data.length - 1; // update counter
	};

	const editTodo = (updatedTodo: ITodo): void => {
		const updatedTodos = data.map(todo => {
			if (todo.id === updatedTodo.id) return updatedTodo;
			return todo;
		})
		setData(updatedTodos);
	};

	const moveUpTodo = (id: number): void => {
		const index = data.findIndex(todo => todo.id === id); // find the index
		if (index === 0) return; // check for out of bounds, exit if first in arr

		// swap the data and make react render
		const newData = [...data];

		const temp = newData[index - 1];
		newData[index - 1] = newData[index];
		newData[index] = temp;
		setData(newData);
	};

	const moveDownTodo = (id: number): void => {
		const index = data.findIndex(todo => todo.id === id);
		if (index === data.length - 1) return; // check for out of bounds, exit if last in arr

		const newData = [...data];

		const temp = newData[index + 1];
		newData[index + 1] = newData[index];
		newData[index] = temp;
		setData(newData);
	};

	const sortByTimeAsc = (): void => {
		const newData = [...data];
		newData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
		setData(newData);
	};

	const sortByTimeDesc = (): void => {
		const newData = [...data];
		newData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
		setData(newData);
	};

	const sortByAuthorAsc = (): void => {
		const newData = [...data];
		newData.sort((a, b) => a.author.localeCompare(b.author));
		setData(newData);
	};

	const sortByAuthorDesc = (): void => {
		const newData = [...data];
		newData.sort((a, b) => b.author.localeCompare(a.author));
		setData(newData);
	};

	const todoContext: ITodoContext = {
		taskList: data,
		handleTaskClick,
		handleDeleteClick,
		handleTaskAdd,
		editTodo,
		moveUpTodo,
		moveDownTodo,
		sortByTimeAsc,
		sortByTimeDesc,
		sortByAuthorAsc,
		sortByAuthorDesc
	};

	return (
		<div className="app">
			<NavBar />
			<main className="main-content">
				<h1>Todo List</h1>
				<h2>Manage your tasks and stay organized.</h2>
				<Outlet context={todoContext} />
			</main>
		</div>
	);
}
