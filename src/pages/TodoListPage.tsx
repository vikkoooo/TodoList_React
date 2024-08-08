import { FormEvent, ReactElement, useState } from "react";
import { TodoTask } from "../components/TodoTask";
import { ITodo, ITodoContext } from "../interfaces";
import { useOutletContext } from "react-router-dom";

let todoGlobal: ITodo; // tmp storage

export function TodoListPage(): ReactElement {
	const { taskList, handleTaskClick, handleDeleteClick } = useOutletContext<ITodoContext>(); // context variables instead of interface and prop
	const [newTaskInput, setNewTaskInput] = useState("");
	const [newAuthorInput, setNewAuthorInput] = useState("");

	const handleEditClick = (todo: ITodo) => {
		setNewTaskInput(todo.task);
		setNewAuthorInput(todo.author)
		todoGlobal = todo; // store the todo object in our global variable
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		todoGlobal.task = newTaskInput;
		todoGlobal.author = newAuthorInput;
		todoGlobal.timestamp = new Date();
		setNewTaskInput("");
		setNewAuthorInput("");
	};

	return (
		<div className="todo-list-page">
			<ol className="task-list">
				{taskList.map((element) => (
					<TodoTask
						key={element.id}
						todoTask={element}
						handleTaskClick={handleTaskClick}
						handleDeleteClick={handleDeleteClick}
						handleEditClick={handleEditClick} />
				))}
			</ol>

			<form className="edit" onSubmit={handleSubmit}>
				<input type="text" className="edit-task-field" placeholder="Edit Task" value={newTaskInput} onChange={(event) => setNewTaskInput(event.target.value)} />
				<input type="text" className="edit-author-field" placeholder="Edit Author" value={newAuthorInput} onChange={(event) => setNewAuthorInput(event.target.value)} />
				<button type="submit" className="edit-button">Edit</button>
			</form>
		</div>
	);
}