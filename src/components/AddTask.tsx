import { FormEvent, ReactElement, useState } from "react";

interface AddTaskProps {
	addTask: (newTaskInput: string, author: string) => void;
}

export function AddTask(props: AddTaskProps): ReactElement {
	const [taskInput, setTaskInput] = useState("");
	const [authorInput, setAuthorInput] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.addTask(taskInput, authorInput);
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

