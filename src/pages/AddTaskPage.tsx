import { FormEvent, ReactElement, useState } from "react";
import { ITodoContext } from "../interfaces";
import { useOutletContext } from "react-router-dom";

export function AddTaskPage(): ReactElement {
	const [taskInput, setTaskInput] = useState("");
	const [authorInput, setAuthorInput] = useState("");
	const { handleTaskAdd } = useOutletContext<ITodoContext>(); // context variables instead of interface and prop

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleTaskAdd(taskInput, authorInput);
		setTaskInput("");
		setAuthorInput("");
	}

	return (
		<form className="add-task" onSubmit={handleSubmit}>
			<input type="text" className="input-task" placeholder="Add a new task" value={taskInput} onChange={(event) => setTaskInput(event.target.value)} />
			<input type="text" className="input-author" placeholder="Author" value={authorInput} onChange={(event) => setAuthorInput(event.target.value)} />
			<button type="submit" className="add-button">Add</button>
		</form>
	);
}