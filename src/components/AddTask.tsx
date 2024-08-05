import { FormEvent, ReactElement, useState } from "react";

interface AddTaskProps {
	addTask: (newTaskInput: string) => void;
}

export function AddTask(props: AddTaskProps): ReactElement {
	const [taskInput, setTaskInput] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.addTask(taskInput);
		setTaskInput("");
	}

	return (
		<form className="add-task" onSubmit={handleSubmit}>
			<label>Add new task</label>
			<input type="text" value={taskInput} onChange={(event) => setTaskInput(event.target.value)} />
			<button type="submit" className="add-button">Add</button>
		</form>
	);
}

