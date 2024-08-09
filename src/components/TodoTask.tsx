import { ReactElement } from "react";
import { ITodo, ITodoContext } from "../interfaces";
import { useOutletContext } from "react-router-dom";

interface TodoTaskProps {
	todoTask: ITodo;
	handleEditClick: (todo: ITodo) => void;
}

export function TodoTask(props: TodoTaskProps): ReactElement {
	const { handleTaskClick, handleDeleteClick, moveUpTodo, moveDownTodo } = useOutletContext<ITodoContext>(); // context variables instead of interface and prop

	return (
		<li className="task-item">
			{props.todoTask.isCompleted
				? <span className="material-symbols-outlined is-completed" onClick={() => handleTaskClick(props.todoTask)}>task_alt</span>
				: <span className="material-symbols-outlined is-completed" onClick={() => handleTaskClick(props.todoTask)}>circle</span>}
			<div className="task-container">
				<div className="upper-row">
					<span className="timestamp">{props.todoTask.timestamp.toLocaleString()}</span>
					<span className="task-author">{props.todoTask.author}</span>
				</div>
				<div className="lower-row">
					<span className="task">{props.todoTask.task}</span>
				</div>
			</div>
			<span className="material-symbols-outlined move-up" onClick={() => moveUpTodo(props.todoTask.id)}>text_select_move_up</span>
			<span className="material-symbols-outlined move-down" onClick={() => moveDownTodo(props.todoTask.id)}>text_select_move_down</span>
			<span className="material-symbols-outlined edit" onClick={() => props.handleEditClick(props.todoTask)}>edit</span>
			<span className="material-symbols-outlined delete" onClick={() => handleDeleteClick(props.todoTask)}>delete</span>
		</li >
	);
}