import { FormEvent, ReactElement, useState } from "react";
import { TodoTask } from "../components/TodoTask";
import { ITodo, ITodoContext } from "../interfaces";
import { useOutletContext } from "react-router-dom";

export function TodoListPage(): ReactElement {
	const { taskList, handleTaskClick, handleDeleteClick, editTodo } = useOutletContext<ITodoContext>(); // context variables instead of interface and prop
	const [newTaskInput, setNewTaskInput] = useState("");
	const [newAuthorInput, setNewAuthorInput] = useState("");
	const [currentTodo, setCurrentTodo] = useState<ITodo>();

	const handleEditClick = (todo: ITodo) => {
		setNewTaskInput(todo.task);
		setNewAuthorInput(todo.author)
		setCurrentTodo(todo);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNewTaskInput("");
		setNewAuthorInput("");

		if (currentTodo === undefined) return; // exit if clicked when undefined

		const updatedTodoObject: ITodo = {
			id: currentTodo.id,
			task: newTaskInput,
			isCompleted: currentTodo!.isCompleted,
			timestamp: new Date(),
			author: newAuthorInput
		};
		editTodo(updatedTodoObject);
		setCurrentTodo(undefined); // clear "holding" the object after an edit was completed
	}

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