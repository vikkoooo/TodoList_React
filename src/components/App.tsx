import { ReactElement, useState } from "react";
import { ITodo } from "../interfaces.ts";
import { TodoList } from "./TodoList";
import { AddTask } from "./AddTask.tsx";

let currentIndex: number = 4; // global id variable, update if default data is updated

export function App(): ReactElement {

	// default start data
	const [data, setData] = useState<ITodo[]>([
		{ id: 1, task: "koda", isCompleted: false },
		{ id: 2, task: "springa", isCompleted: true },
		{ id: 3, task: "laga middag", isCompleted: false },
		{ id: 4, task: "handla", isCompleted: false }
	]);

	const handleTaskAdd = (newTaskInput: string): void => {
		const newTask: ITodo = {
			id: ++currentIndex, // increase counter before using the variable
			task: newTaskInput,
			isCompleted: false
		};
		setData([...data, newTask]); // append using spread syntax
	};

	const handleTaskClick = (todo: ITodo): void => {
		console.log(`Clicked, status: ${todo.isCompleted}`);
		toggleStatus(todo);
	}

	const toggleStatus = (todo: ITodo) => {
		const dataCopy = [...data];

		// fint the clicked element
		dataCopy.forEach(element => {
			if (element.id === todo.id) {
				element.isCompleted = !element.isCompleted; // toggle
			}
		});

		setData(dataCopy); // update data
	}

	return (
		<div className="app">
			<TodoList taskList={data} handleTaskClick={handleTaskClick} />
			<AddTask addTask={handleTaskAdd} />
		</div>
	);
}
