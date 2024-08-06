import { ReactElement, useState } from "react";
import { ITodo } from "../interfaces.ts";
import { TodoList } from "./TodoList";
import { AddTask } from "./AddTask.tsx";

let currentIndex: number = 4; // global id variable, update if default data is updated

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
	}

	const handleDeleteClick = (todo: ITodo): void => {
		const dataCopy = data.filter(task => task.id !== todo.id); // make new array with anything BUT matching ids

		setData(dataCopy); // update data
	}

	return (
		<div className="app">
			<TodoList taskList={data} handleTaskClick={handleTaskClick} handleDeleteClick={handleDeleteClick} />
			<AddTask addTask={handleTaskAdd} />
		</div>
	);
}
