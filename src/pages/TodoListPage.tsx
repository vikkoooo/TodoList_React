import { FormEvent, ReactElement, useState } from "react";
import { TodoTask } from "../components/TodoTask";
import { ITodo, ITodoContext } from "../interfaces";
import { useOutletContext } from "react-router-dom";

export function TodoListPage(): ReactElement {
	const { taskList, editTodo, sortByTimeAsc, sortByTimeDesc, sortByAuthorAsc, sortByAuthorDesc } = useOutletContext<ITodoContext>();
	const [newTaskInput, setNewTaskInput] = useState("");
	const [newAuthorInput, setNewAuthorInput] = useState("");
	const [currentTodo, setCurrentTodo] = useState<ITodo>();

	const handleEditClick = (todo: ITodo) => {
		setNewTaskInput(todo.task);
		setNewAuthorInput(todo.author);
		setCurrentTodo(todo);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNewTaskInput("");
		setNewAuthorInput("");

		if (currentTodo === undefined) return; // exit if clicked when undefined

		const updatedTodoObject: ITodo = {
			...currentTodo,
			task: newTaskInput,
			timestamp: new Date(),
			author: newAuthorInput
		};
		editTodo(updatedTodoObject);
		setCurrentTodo(undefined); // clear "holding" the object after an edit was completed
	}

	const handleSortByTimeAscClicked = () => {
		sortByTimeAsc();
	}

	const handleSortByTimeDescClicked = () => {
		sortByTimeDesc();
	}

	const handleSortByAuthorAscClicked = () => {
		sortByAuthorAsc();
	}

	const handleSortByAuthorDescClicked = () => {
		sortByAuthorDesc();
	}

	return (
		<div className="todo-list-page">
			<div className="sort-buttons">
				<button type="button" className="sort-button" onClick={handleSortByTimeAscClicked}>
					<span className="material-symbols-outlined">nest_clock_farsight_analog</span>
					<span className="material-symbols-outlined">arrow_upward</span>
				</button>
				<button type="button" className="sort-button" onClick={handleSortByTimeDescClicked}>
					<span className="material-symbols-outlined">nest_clock_farsight_analog</span>
					<span className="material-symbols-outlined">arrow_downward</span>
				</button>
				<button type="button" className="sort-button" onClick={handleSortByAuthorAscClicked}>
					<span className="material-symbols-outlined">person</span>
					<span className="material-symbols-outlined">arrow_upward</span>
				</button>
				<button type="button" className="sort-button" onClick={handleSortByAuthorDescClicked}>
					<span className="material-symbols-outlined">person</span>
					<span className="material-symbols-outlined">arrow_downward</span>
				</button>
			</div>
			<ol className="task-list">
				{taskList.map((element) => (
					<TodoTask
						key={element.id}
						todoTask={element}
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