import { ReactElement } from "react";
import { ITodo } from "../interfaces";

interface TodoTaskProps {
	todoTask: ITodo;
	handleTaskClick: (todo: ITodo) => void;
	handleDeleteClick: (todo: ITodo) => void;
}

export function TodoTask(props: TodoTaskProps): ReactElement {
	return (
		<li><span className="timestamp">{props.todoTask.timestamp.toLocaleString()}</span>
			<span className="task-name">{props.todoTask.task}</span>
			<span className="task-author">{props.todoTask.author}</span>
			{props.todoTask.isCompleted
				? <span className="material-symbols-outlined is-completed" onClick={() => props.handleTaskClick(props.todoTask)}>task_alt</span>
				: <span className="material-symbols-outlined is-completed" onClick={() => props.handleTaskClick(props.todoTask)}>circle</span>}
			<span className="material-symbols-outlined delete" onClick={() => props.handleDeleteClick(props.todoTask)}>delete</span>
		</li >
	);
}