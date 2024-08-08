import { ReactElement } from "react";
import { ITodo } from "../interfaces";

interface TodoTaskProps {
	todoTask: ITodo;
	handleTaskClick: (todo: ITodo) => void;
	handleDeleteClick: (todo: ITodo) => void;
	handleEditClick: (todo: ITodo) => void;
}

export function TodoTask(props: TodoTaskProps): ReactElement {
	return (
		<li className="task-item">
			{props.todoTask.isCompleted
				? <span className="material-symbols-outlined is-completed" onClick={() => props.handleTaskClick(props.todoTask)}>task_alt</span>
				: <span className="material-symbols-outlined is-completed" onClick={() => props.handleTaskClick(props.todoTask)}>circle</span>}
			<div className="task-container">
				<div className="upper-row">
					<span className="timestamp">{props.todoTask.timestamp.toLocaleString()}</span>
					<span className="task-author">{props.todoTask.author}</span>
				</div>
				<div className="lower-row">
					<span className="task">{props.todoTask.task}</span>
				</div>
			</div>
			<span className="material-symbols-outlined edit" onClick={() => props.handleEditClick(props.todoTask)}>edit</span>
			<span className="material-symbols-outlined delete" onClick={() => props.handleDeleteClick(props.todoTask)}>delete</span>
		</li >
	);
}